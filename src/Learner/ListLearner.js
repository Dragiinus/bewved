import React, { useEffect, useState } from 'react'
import learnerService from '@/services/learner.service';

export default function ListLearner() {
  const [learners, setLearners] = useState([]);
  useEffect(() => {
    listLearner()
  })
  const listLearner = () => {
    learnerService.getAll()
        .then(res => {
            console.log('Liste learners');
            setLearners(res.data.data);
        })
        .catch(err => {
            console.log('Error', err);
        })
  }
  const handleDelete = idLearner => {
    learnerService.remove(idLearner)
      .then(res =>{
        console.log("Suppression faite", res.data.data);
      })
      .catch(err =>{
        console.log("Erreur", err);
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
              <tr key={learner.idLearner}>
                <td>{learner.idsession}</td>
                <td>{learner.firstNameLearner}</td>
                <td>{learner.lastNameLearner}</td>
                <td>{learner.genderLearner}</td>
                <td>{learner.ageLearner}</td>
                <td><button className='btn btn-info'>Update</button></td>
                <td><button className='btn btn-danger' onClick={(e) => handleDelete(learner.idLearner)}>Supprimer</button></td>
              </tr>
            )
          }
        </tbody>
      </table>
    </div>
  )
}
