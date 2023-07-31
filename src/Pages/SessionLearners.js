import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import learnerService from '@/services/learner.service';
import sessionService from '@/services/session.service';

export default function SessionLearners() {
  const { sessionId } = useParams();
  const [learners, setLearners] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [selectedSession, setSelectedSession] = useState('');

  useEffect(() => {
    listLearnersBySession();
    getListSessions();
    setSelectedSession(sessionId);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessionId]);

  useEffect(() => {
    // Get the name of the selected session
    const selectedSessionName = sessions.find((session) => session.idsession === parseInt(selectedSession, 10));
    if (selectedSessionName) {
      document.title = `Session: ${selectedSessionName.nameClass}`;
    }
  }, [selectedSession, sessions]);

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

  const navigate = useNavigate();

  const handleSelectSession = (e) => {
    setSelectedSession(e.target.value);
    // Redirect to the selected session page
    navigate(`/sessions/${e.target.value}`);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          {/* Liste déroulante pour choisir la session */}
          <select
            value={selectedSession}
            onChange={handleSelectSession}
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
          <Link to="/addLearner" className="btn btn-primary">
            Add Learner
          </Link>
        </div>
      </div>

      <h4 className="text-center mt-4">
        {selectedSession === 'all' ? 'All Sessions' : sessions.find(session => session.idsession === parseInt(selectedSession, 10))?.nameClass || ''}
      </h4>

      <br />
      <table className="table table-stripped table-bordered text-center align-middle">
        <thead>
          <tr>
            <th>Nom</th>
            <th>Prénom</th>
            <th>Genre</th>
            <th>Age</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {learners.map((learner) => (
            <tr key={learner.idLearner}>
              <td>{learner.firstNameLearner}</td>
              <td>{learner.lastNameLearner}</td>
              <td>{getGenderName(learner.genderLearner)}</td>
              <td>{learner.ageLearner}</td>
              <td>
                <Link
                  className="btn btn-info btn-sm m-1"
                  to={`/updateLearner/${learner.idLearner}`}
                >
                  <FontAwesomeIcon icon={faEdit} />
                </Link>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={(e) => handleDelete(learner.idLearner)}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
