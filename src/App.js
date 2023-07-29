import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import ListLearner from '@/Learner/ListLearner';
import AddLearner from '@/Learner/AddLearner';
import Header from './components/Header';
import SessionLearners from './components/SessionLearners'; // Import the SessionLearners component

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<SessionLearners />} />
        <Route path="/learners" element={<ListLearner />} />
        <Route path="/learner" element={<AddLearner />} />
        <Route path="/updateLearner/:id" element={<AddLearner isUpdate />} />
        {/* Route for the SessionLearners component */}
        <Route path="/sessions/:sessionId" element={<SessionLearners />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
