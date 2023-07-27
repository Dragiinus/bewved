import '@/App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import AddLearner from '@/Learner/AddLearner';
import ListLearner from '@/Learner/ListLearner';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<ListLearner/>}/>
        <Route path='/learners' element={<ListLearner/>}/>
        <Route path='/learner' element={<AddLearner/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
