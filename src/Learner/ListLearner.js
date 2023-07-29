import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import learnerService from '@/services/learner.service';
import { Link, useNavigate } from 'react-router-dom';
import sessionService from '../services/session.service';

export default function ListLearner() {
  const [learners, setLearners] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [selectedSession, setSelectedSession] = useState('all');

  useEffect(() => {
    listLearner();
    getListSessions();
  }, []);

  const listLearner = () => {
    learnerService
      .getAll()
      .then((res) => {
        console.log('Liste learners', res.data.data);
        setLearners(res.data.data);
      })
      .catch((err) => {
        console.log('Error', err);
      });
  };

  const getSessionName = (sessionId) => {
    const session = sessions.find((session) => session.idsession === sessionId);
    return session ? session.nameClass : 'Unknown Session';
  };

  const getGenderName = (genderCode) => {
    return genderCode === 1 ? 'Homme' : genderCode === 2 ? 'Femme' : 'Unknown Gender';
  };

  const getListSessions = () => {
    sessionService
      .getList()
      .then((res) => {
        console.log('List Session', res.data.data);
        setSessions(res.data.data);
      })
      .catch((err) => {
        console.log('Erreur', err);
      });
  };

  // Filtrer les apprenants en fonction de la session sélectionnée
  const filteredLearners = selectedSession === 'all'
    ? learners
    : learners.filter((learner) => learner.idsession === parseInt(selectedSession, 10));

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

  const navigate = useNavigate(); // Get the navigate function from react-router-dom

  const handleSessionChange = (e) => {
    setSelectedSession(e.target.value);
    navigate(`/sessions/${e.target.value}`); // Perform the navigation to the selected session
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          {/* Liste déroulante pour choisir la session */}
          <select
            value={selectedSession}
            onChange={handleSessionChange}
            className="form-select"
          >
            <option value="all">Toutes les sessions</option>
            {sessions.map((session) => (
              <option key={session.idsession} value={session.idsession}>
                {session.nameClass}
              </option>
            ))}
          </select>
        </div>
        <div className="col-md-6 d-flex justify-content-end">
          {/* Bouton "Add Learner" redirigeant vers la page d'ajout d'un learner */}
          <Link to="/learner" className="btn btn-primary">
            Add Learner
          </Link>
        </div>
      </div>

      <h4 className="text-center mt-4">List Learner</h4>
      <br />
      <table className="table table-stripped table-bordered text-center align-middle">
        <thead>
          <tr>
            <th>Session</th>
            <th>Nom</th>
            <th>Prénom</th>
            <th>Genre</th>
            <th>Age</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredLearners.map((learner) => (
            <tr key={learner.idLearner}>
              <td>{getSessionName(learner.idsession)}</td>
              <td>{learner.firstNameLearner}</td>
              <td>{learner.lastNameLearner}</td>
              <td>{getGenderName(learner.genderLearner)}</td>
              <td>{learner.ageLearner}</td>
              <td>
                <Link className="btn btn-info btn-sm m-1" to={`/updateLearner/${learner.idLearner}`}>
                  <FontAwesomeIcon icon={faEdit} /> {/* Icône du crayon */}
                </Link>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(learner.idLearner)}
                >
                  <FontAwesomeIcon icon={faTrash} /> {/* Icône de la croix */}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
