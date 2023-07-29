import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import AddLearner from '@/Pages/AddLearner';
import Header from '@/components/Header';
import SessionLearners from '@/Pages/SessionLearners'; // Import the SessionLearners component

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<SessionLearners />} />
        <Route path="/addLearner" element={<AddLearner />} />
        <Route path="/updateLearner/:id" element={<AddLearner isUpdate />} />
        {/* Route for the SessionLearners component */}
        <Route path="/sessions/:sessionId" element={<SessionLearners />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
