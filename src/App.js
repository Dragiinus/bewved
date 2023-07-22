import logo from '@/logo.svg';
import '@/App.css';
import Home from '@/pages/Home';
import Board from '@/pages/Board';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Home />
        <Board />
      </header>
    </div>
  );
}

export default App;
