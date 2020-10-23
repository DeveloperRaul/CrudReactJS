import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link, NavLink } from "react-router-dom";
import { About } from './Components/About';
import { Contact } from './Components/Contact';
import Movies from './Components/Movies/Movies';
import { Register } from './Components/Register';

function App() {
  return (
    <Router>
      <div className="container mt-5">
        <div className="btn-group">
          <Link to="/" className="btn btn-dark">Home | Movies</Link>
          <Link to="/about" className="btn btn-dark">About</Link>
          <Link to="/contact" className="btn btn-dark">Contact</Link>
          <NavLink to="/register" className="btn btn-dark" activeClassName="active">Register</NavLink>
        </div>
        <hr />
        <Switch>
          <Route path="/" exact>
            <Movies/>
          </Route>
          <Route path="/about">
            <About/>
          </Route>
          <Route path="/contact" exact>
            <Contact/>
          </Route>
          <Route path="/register">
            <Register/>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
