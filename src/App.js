import '@/App.css';
// import AddLearner from '@/Learner/AddLearner';
import ListLearner from '@/Learner/ListLearner';


function App() {
  return (
    <div className="container">
      <h1>Gestion des etudiants</h1>
      <ListLearner />
    </div>
  );
}

export default App;
