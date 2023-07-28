import React, { useEffect, useState } from 'react';
import learnerService from '@/services/learner.service';
import sessionService from '../services/session.service';
import { useNavigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

const AddLearner = () => {
  let navigate = useNavigate();
  const { id } = useParams();
  const [idsession, setIdSession] = useState('');
  const [firstNameLearner, setFirstNameLearner] = useState('');
  const [lastNameLearner, setLastNameLearner] = useState('');
  const [genderLearner, setGenderLearner] = useState('');
  const [ageLearner, setAgeLearner] = useState('');
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    getList();
    if (id) {
      learnerService
        .getData(id)
        .then((learner) => {
          const data = learner.data;
          setFirstNameLearner(data.firstNameLearner);
          setLastNameLearner(data.lastNameLearner);
          setGenderLearner(data.genderLearner);
          setAgeLearner(data.ageLearner);
          setIdSession(data.idsession);
        })
        .catch((err) => {
          console.log('Erreur', err);
        });
    }
  }, [id]);

  function getList() {
    sessionService.getList()
      .then((res) => {
        console.log('List Session', res.data.data);
        setSessions(res.data.data);
      })
      .catch((err) => {
        console.log('Erreur', err)
      });
  }

  const saveData = (e) => {
    e.preventDefault();
    const learner = {
      id,
      firstNameLearner,
      lastNameLearner,
      genderLearner,
      ageLearner,
      idsession,
    };

    if (id) {
      learnerService
        .update(id, learner)
        .then((res) => {
          console.log('Modification faite', res.data);
          navigate('/learners');
        })
        .catch((err) => {
          console.log('Error', err);
        });
    } else {
      learnerService
        .create(learner)
        .then((res) => {
          console.log('Validation');
          navigate('/learners');
        })
        .catch((err) => {
          console.log('Error', err);
        });
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="d-flex justify-content-end mb-3">
            {/* Bouton "List Learner" redirigeant vers la page de la liste des learners */}
            <Link to="/learners" className="btn btn-primary">
              List Learner
            </Link>
          </div>
          <h4 className="text-center">Add Student</h4>
          <form onSubmit={saveData}>
            <div className="form-group">
              <label>Session :</label>
              <select
                name="idsession"
                id="idsession"
                value={idsession}
                className="form-control"
                onChange={(e) => setIdSession(e.target.value)}>
                <option disabled selected>-- Select one --</option>
                {sessions.map((session) => (
                  <option key={session.idsession} value={session.idsession}>
                    {session.nameClass}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Nom :</label>
              <input
                type="text"
                name="firstNameLearner"
                id="firstNameLearner"
                value={firstNameLearner}
                className="form-control"
                placeholder="Votre nom"
                onChange={(e) => setFirstNameLearner(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Prenom :</label>
              <input
                type="text"
                name="lastNameLearner"
                id="lastNameLearner"
                value={lastNameLearner}
                className="form-control"
                placeholder="Votre prenom"
                onChange={(e) => setLastNameLearner(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Genre :</label>
              <select
                name="genderLearner"
                id="genderLearner"
                value={genderLearner}
                className="form-control"
                onChange={(e) => setGenderLearner(e.target.value)}>
                <option value="0">-- Select one --</option>
                <option value="1">Homme</option>
                <option value="2">Femme</option>
              </select>
            </div>
            <div className="form-group">
              <label>Age :</label>
              <input
                type="number"
                name="ageLearner"
                id="ageLearner"
                value={ageLearner}
                className="form-control"
                placeholder="Votre age"
                onChange={(e) => setAgeLearner(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Save
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddLearner;
