import React from "react";
import Login from "./components/Login";
import Home from "./components/Home";
import NotFound from "./components/NotFound";
import "./App.css";
import { Route, BrowserRouter as Router } from "react-router-dom";
import {Switch} from 'react-router'


function App() {
  return (
    <Router>
      <div>
        <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/home" component={Home} />
        <Route component={NotFound}/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
