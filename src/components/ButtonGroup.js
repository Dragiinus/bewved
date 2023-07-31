import React from 'react';
import { Link, Navigate } from 'react-router-dom';


const ButtonGroup = (selectedSession) => {

    // Add this function to handle navigation to the GroupFormation page
  const handleGroupFormation = () => {
    Navigate(`/sessions/${selectedSession}/group`);
  };

    return (
        <div className="col-md-6 text-end">
          <Link to="/sessions/:sessionId/group" className="btn btn-primary mt-3" onClick={handleGroupFormation}>
            Formation des groupes
          </Link>
        </div>
    );
};

export default ButtonGroup;