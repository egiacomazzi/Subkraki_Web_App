import logo from './data/logo.svg';
import './CSS/App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Hallo Franzi!
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          LOOOOOOOS Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
