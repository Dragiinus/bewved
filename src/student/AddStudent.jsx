import React, { useState } from 'react';
import learnerService from '../services/learner.service';
import { useParams } from 'react-router-dom';


const AddStudent = () => {
    const {id} = useParams();
    const [firstNameLearner, setFirstNameLearner] = useState('');
    const [lastNameLearner, setLastNameLearner] = useState('');
    const [genderLearner, setGenderLearner] = useState(''); 
    const [ageLearner, setAgeLearner] = useState(''); 
    const [idsession, setIdSession] = useState('');
    const saveData = (e) => {
        e.preventDefault();
        const learner = {id, firstNameLearner, lastNameLearner, genderLearner, ageLearner, idsession}
        learnerService.create(learner)
        .then(res => {
            console.log('Validation');
        })
        .catch(err => {
            console.log('Error', err);
        })
    }
    return (
        <div className='container'>
            <h4 className='text-center'>Add Student</h4>
            <div className='row'>
                <div className='card col-md-8 offset-md-2 offset-md-2'>

                    <br></br>
                    <form>
                         <div className='form-group'>
                            <label>Session</label>
                            <input type="text" name="idsession" id="idsession" value={idsession} className='form-control' 
                            placeholder='Votre session' onChange={(e) => setIdSession(e.target.value)}/>
                        </div>
                        <div className='form-group'>
                            <label>Nom</label>
                            <input type="text" name="firstNameLearner" id="firstNameLearner" value={firstNameLearner} className='form-control' 
                            placeholder='Votre nom' onChange={(e) => setFirstNameLearner(e.target.value)}/>
                        </div>
                        <div className='form-group'>
                            <label>Prenom</label>
                            <input type="text" name="lastNameLearner" id="lastNameLearner" value={lastNameLearner} className='form-control' 
                            placeholder='Votre prenom' onChange={(e) => setLastNameLearner(e.target.value)}/>
                        </div>
                        <div className='form-group'>
                            <label>Genre</label>
                            <input type="text" name="genderLearner" id="genderLearner" value={genderLearner} className='form-control' 
                            placeholder='Votre genre' onChange={(e) => setGenderLearner(e.target.value)}/>
                        </div>
                        <div className='form-group'>
                            <label>Age</label>
                            <input type="text" name="ageLearner" id="ageLearner" value={ageLearner} className='form-control' 
                            placeholder='Votre age' onChange={(e) => setAgeLearner(e.target.value)}/>
                        </div>
                        <button className='btn btn-primary' onClick={(e) => saveData(e)}>Save</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddStudent;