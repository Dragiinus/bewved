// Table.js
import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

const Table = ({ learners, handleDelete, getGenderName }) => {
  return (
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
              <Link className="btn btn-info btn-sm m-1" to={`/updateLearner/${learner.idLearner}`}>
                <FontAwesomeIcon icon={faEdit} />
              </Link>
              <button className="btn btn-danger btn-sm" onClick={(e) => handleDelete(learner.idLearner)}>
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
