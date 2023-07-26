import '@/App.css';
import AddStudent from './student/AddStudent';
import Axios from 'axios';


function App() {
  Axios({
    method: "GET",
    url: "http://localhost:5000/api",
    headers: {
      "Content-Type": "application/json"
    }
  }).then(res => {
    console.log(res.data.message)
  })
  return (
    <div className="container">
      <h1>Gestion des etudiants</h1>
      <AddStudent />
    </div>
  );
}

export default App;
