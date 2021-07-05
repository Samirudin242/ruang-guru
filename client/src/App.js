import { BrowserRouter as Router, Route, } from "react-router-dom";
import './App.css';
import Home from "./pages/Home";
import Learn from "./pages/Learn";
import {AuthProvider} from "./context/auth";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Router>
          <Route exact path="/" component={Home}/>
          <Route exact path="/learn" component={Learn} />
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
