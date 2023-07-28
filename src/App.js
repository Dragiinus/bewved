import React from 'react';
import '@/App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import AddLearner from '@/Learner/AddLearner';
import ListLearner from '@/Learner/ListLearner';
import Header from './components/Header';

function App() {
  return (
    
    <BrowserRouter>
            <Header />
      <Routes>
        <Route path="/" element={<ListLearner />} />
        <Route path="/learners" element={<ListLearner />} />
        <Route path="/learner" element={<AddLearner />} />
        {/* Pass the learner data as props to AddLearner component */}
        <Route path="/updateLearner/:id" element={<AddLearner isUpdate />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;