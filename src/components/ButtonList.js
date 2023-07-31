import React from 'react';
import { Link } from 'react-router-dom';

const ButtonList = () => {
    return (
        <div>
            <div className="d-flex justify-content-end mb-3">
            {/* Bouton "List Learner" redirigeant vers la page de la liste des learners */}
            <Link to="/sessions/all" className="btn btn-primary">
              List Learner
            </Link>
          </div>
        </div>
    );
};

export default ButtonList;