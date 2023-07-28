import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from '@/components/Header';
import AddLearner from '@/Learner/AddLearner';
import ListLearner from '@/Learner/ListLearner';

function App() {
  const [selectedSession, setSelectedSession] = useState('');

  return (
    <BrowserRouter>
      <Header onSelectSession={setSelectedSession} />
      <Routes>
        {/* Pass the selectedSession prop to the ListLearner component */}
        <Route path="/" element={<ListLearner selectedSession={selectedSession} />} />
        <Route path="/learners" element={<ListLearner selectedSession={selectedSession} />} />
        <Route path="/learner" element={<AddLearner />} />
        <Route path="/updateLearners/:id" element={<AddLearner />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;