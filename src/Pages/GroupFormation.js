import Table from "@/components/Table";
import learnerService from "@/services/learner.service";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function GroupFormation() {
  const { sessionId } = useParams();
  const [learners, setLearners] = useState([]);
  const [sortByGender, setSortByGender] = useState(false);
  const [sortByAge, setSortByAge] = useState(false);

  useEffect(() => {
    listLearnersBySession();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessionId]);

  const listLearnersBySession = () => {
    if (sessionId && sessionId !== "all") {
      learnerService
        .getAll()
        .then((res) => {
          const learnersBySession = res.data.data.filter(
            (learner) => learner.idsession === parseInt(sessionId, 10)
          );
          setLearners(learnersBySession);
        })
        .catch((err) => {
          console.log("Error", err);
        });
    } else {
      // If the selected session is "all" or invalid, fetch all learners
      learnerService
        .getAll()
        .then((res) => {
          setLearners(res.data.data);
        })
        .catch((err) => {
          console.log("Error", err);
        });
    }
  };

  const handleDelete = (idLearner) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this learner?"
    );
    if (isConfirmed) {
      learnerService
        .remove(idLearner)
        .then((res) => {
          console.log("Suppression faite", res.data.data);
          setLearners((prevLearners) =>
            prevLearners.filter((learner) => learner.idLearner !== idLearner)
          );
        })
        .catch((err) => {
          console.log("Erreur", err);
        });
    }
  };

  const getGenderName = (genderCode) => {
    return genderCode === 1
      ? "Homme"
      : genderCode === 2
      ? "Femme"
      : "Unknown Gender";
  };

  // Function to sort learners by gender and/or age
  const sortLearners = () => {
    let sortedLearners = [...learners];

    // Sort by gender when both sortByGender and sortByAge are active
    if (sortByGender && sortByAge) {
      sortedLearners = sortedLearners.sort((a, b) => {
        // Sort by gender first
        const genderSort = a.genderLearner - b.genderLearner;
        if (genderSort !== 0) {
          return genderSort;
        }
        // If genders are equal, then sort by age (from smallest to largest)
        return getAgeGroup(a.ageLearner) - getAgeGroup(b.ageLearner);
      });
    } else {
      // Sort by gender only when sortByGender is active
      if (sortByGender) {
        sortedLearners = sortedLearners.sort(
          (a, b) => a.genderLearner - b.genderLearner
        );
      }

      // Sort by age only when sortByAge is active (from smallest to largest)
      if (sortByAge) {
        sortedLearners = sortedLearners.sort(
          (a, b) => getAgeGroup(a.ageLearner) - getAgeGroup(b.ageLearner)
        );
      }
    }

    return sortedLearners;
  };

  // Function to determine the age group based on age
  const getAgeGroup = (age) => {
    if (age >= 18 && age <= 25) {
      return 1;
    } else if (age >= 26 && age <= 35) {
      return 2;
    } else if (age >= 36 && age <= 45) {
      return 3;
    } else if (age >= 46 && age <= 55) {
      return 4;
    } else {
      return 5;
    }
  };

  // Function to group learners into five groups with balanced gender and age
  const groupLearners = () => {
    // Use sortLearners for sorting by gender and/or age
    const sortedLearners = sortLearners();

    // Initialize an array of five groups
    const groups = Array(5)
      .fill()
      .map(() => ({ males: [], females: [] }));

    // Distribute learners from age groups into final groups
    let learnerCountPerGroup = 0;
    sortedLearners.forEach((learner) => {
      const groupIndex = learnerCountPerGroup % 5;
      const genderGroup = learner.genderLearner === 1 ? "males" : "females";

      // Check if the group has reached the maximum limit of 5 learners
      const isGroupFull = groups[groupIndex][genderGroup].length >= 5;

      // If the group is not full, add the learner to the group
      if (!isGroupFull) {
        groups[groupIndex][genderGroup].push(learner);
        learnerCountPerGroup++;
      }
    });

    return groups;
  };

  const groupedLearners = groupLearners();

  return (
    <div className="container">
      <div className="text-center">
        <Link to={`/sessions/${sessionId}`} className="btn btn-primary mt-3">
          Retourner à la session
        </Link>
        <button
          className={`btn ${
            sortByGender ? "btn-success" : "btn-secondary"
          } ms-3 mt-3`}
          onClick={() => setSortByGender(!sortByGender)}
        >
          {sortByGender
            ? "Désactiver le tri par genre"
            : "Activer le tri par genre"}
        </button>
        <button
          className={`btn ${
            sortByAge ? "btn-info" : "btn-secondary"
          } ms-3 mt-3`}
          onClick={() => setSortByAge(!sortByAge)}
        >
          {sortByAge ? "Désactiver le tri par âge" : "Activer le tri par âge"}
        </button>
      </div>
      <h4 className="text-center mt-4">
        {sessionId === "all" ? "All Sessions" : `Session: ${sessionId}`}
      </h4>

      <br />
      {/* Render five tables */}
      {groupedLearners.map((group, index) => (
        <div key={index}>
          <h5 className="text-center mt-4">Groupe {index + 1}</h5>
          <Table
            learners={group.males.concat(group.females)}
            handleDelete={handleDelete}
            getGenderName={getGenderName}
          />
        </div>
      ))}
    </div>
  );
}
