import logo from './logo.svg';
import './App.css';
import './style/font.css';
import Home from './pages/Home';
import GlobalStyle from './style/global';

function App() {
  return (
    <div className="App">
      <GlobalStyle />
      <Home />
    </div>
  );
}

export default App;
