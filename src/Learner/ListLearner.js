import React, { useEffect, useState } from 'react';
import learnerService from '@/services/learner.service';
import { Link } from 'react-router-dom';
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
        console.log('Liste learners');
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

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          {/* Liste déroulante pour choisir la session */}
          <select
            value={selectedSession}
            onChange={(e) => setSelectedSession(e.target.value)}
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

      

      <h4 className="text-center">List Learner</h4>
      <br />
      <table className="table table-stripped table-bordered">
        <thead>
          <tr>
            <th>Session</th>
            <th>Nom</th>
            <th>Prénom</th>
            <th>Genre</th>
            <th>Age</th>
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
                <Link className="btn btn-info" to={`/updateLearner/${learner.idLearner}`}>
                  Update
                </Link>
              </td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={(e) => handleDelete(learner.idLearner)}
                >
                  Supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
