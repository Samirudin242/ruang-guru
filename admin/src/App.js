import {BrowserRouter as Router, Route} from "react-router-dom";


import './App.css';
import Home from "./pages/Home";
import Profile from './pages/Profile';

function App() {
  return (
    <div className="App">
      <Router>
        <Route exact path="/"  component={Home}/>
        <Route exact path="/profile/:id"  component={Profile}/>
      </Router>
    </div>
  );
}

export default App;
