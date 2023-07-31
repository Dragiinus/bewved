import React from 'react';
import { Link } from 'react-router-dom';

const ButtonAdd = () => {
    return (
        <div className="col-md-6 d-flex m-1 justify-content-end">
            {/* Bouton "Add Learner" redirigeant vers la page d'ajout d'un learner */}
            <Link to="/addLearner" className="btn btn-primary">
                Add Learner
            </Link>
        </div>
        
    );
};

export default ButtonAdd;