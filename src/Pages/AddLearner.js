import React from 'react';
import ButtonList from '@/components/ButtonList';
import Form from '@/components/Form';

const AddLearner = () => {
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <ButtonList />
          <Form />
        </div>
      </div>
    </div>
  );
};

export default AddLearner;
