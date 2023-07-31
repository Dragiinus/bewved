// GroupFormation.js
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Table from './Table';
import learnerService from '@/services/learner.service';

export default function GroupFormation() {
  const { sessionId } = useParams();
  const [learners, setLearners] = useState([]);
  const [originalLearners, setOriginalLearners] = useState([]);
  const [sortByGender, setSortByGender] = useState(false);

  useEffect(() => {
    listLearnersBySession();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessionId]);

  useEffect(() => {
    // Keep a copy of original learners when component mounts
    setOriginalLearners([...learners]);
  }, [learners]);

  const listLearnersBySession = () => {
    if (sessionId && sessionId !== 'all') {
      learnerService
        .getAll()
        .then((res) => {
          const learnersBySession = res.data.data.filter(
            (learner) => learner.idsession === parseInt(sessionId, 10)
          );
          setLearners(learnersBySession);
        })
        .catch((err) => {
          console.log('Error', err);
        });
    } else {
      // If the selected session is "all" or invalid, fetch all learners
      learnerService
        .getAll()
        .then((res) => {
          setLearners(res.data.data);
        })
        .catch((err) => {
          console.log('Error', err);
        });
    }
  };

  const handleDelete = (idLearner) => {
    // Prompt for confirmation before deletion
    const isConfirmed = window.confirm('Are you sure you want to delete this learner?');
    if (isConfirmed) {
      learnerService
        .remove(idLearner)
        .then((res) => {
          console.log('Suppression faite', res.data.data);
          // Remove the deleted learner from the state
          setLearners((prevLearners) =>
            prevLearners.filter((learner) => learner.idLearner !== idLearner)
          );
        })
        .catch((err) => {
          console.log('Erreur', err);
        });
    }
  };

  const getGenderName = (genderCode) => {
    // Your get gender name logic here
    return genderCode === 1 ? 'Homme' : genderCode === 2 ? 'Femme' : 'Unknown Gender';
  };

  // Function to group learners into five groups with balanced gender
  const groupLearners = () => {
    // Use originalLearners for sorting by gender when enabled
    const sortedLearners = sortByGender
      ? originalLearners.sort((a, b) => a.genderLearner - b.genderLearner)
      : learners;

    // Divide learners into groups with balanced gender
    const groupedLearners = Array(5).fill().map(() => ({ males: [], females: [] }));

    sortedLearners.forEach((learner, index) => {
      const groupIndex = index % 5;
      const genderGroup = learner.genderLearner === 1 ? 'males' : 'females';
      groupedLearners[groupIndex][genderGroup].push(learner);
    });

    return groupedLearners;
  };

  const groupedLearners = groupLearners();

  return (
    <div className="container">
      <div className="text-center">
        {/* Button to redirect back to sessions/id */}
        <Link to={`/sessions/${sessionId}`} className="btn btn-primary mt-3">
          Retourner à la session
        </Link>
        <button
          className="btn btn-success ms-3 mt-3"
          onClick={() => setSortByGender(!sortByGender)}
        >
          {sortByGender ? 'Désactiver le tri par genre' : 'Activer le tri par genre'}
        </button>
      </div>
      <h4 className="text-center mt-4">
        {sessionId === 'all' ? 'All Sessions' : `Session: ${sessionId}`}
      </h4>

      <br />
      {/* Render five tables */}
      {groupedLearners.map((group, index) => (
        <div key={index}>
          <h5 className="text-center mt-4">Groupe {index + 1}</h5>
          <Table learners={group.males.concat(group.females)} handleDelete={handleDelete} getGenderName={getGenderName} />
        </div>
      ))}
    </div>
  );
}