import React, { useEffect, useState } from 'react'
import learnerService from '../services/learner.service';

export default function ListLearner() {
  const [learners, setLearners] = useState([]);
  useEffect(() => {
    listLearner()
  })
  const listLearner = () => {
    learnerService.getAll()
        .then(res => {
            console.log('Liste learners');
            setLearners(res.data);
        })
        .catch(err => {
            console.log('Error', err);
        })
  }
  return (
    <div>
      <h4 className='text-center'>List Learner</h4>
      <br></br>
      <table className='table table-stripped table-bordered'>
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
          {
            learners.map(
              learner =>
              <tr key={learner.id}>
                <td>{learner.firstNameLearner}</td>
                <td>{learner.lastNameLearner}</td>
                <td>{learner.genderLearner}</td>
                <td>{learner.ageLearner}</td>
                <td>{learner.idsession}</td>
                <td><button className='btn btn-info'>Update</button></td>
                <td><button className='btn btn-danger'>Supprimer</button></td>
              </tr>
            )
          }
        </tbody>
      </table>
    </div>
  )
}
