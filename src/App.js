import React from "react";
import Login from "./components/Login";
import Home from "./components/Home";
import "./App.css";
import { Route, BrowserRouter as Router } from "react-router-dom";

function App() {
  return (
    <Router>
      <div>
        <Route exact path="/" component={Login} />
        <Route exact path="/home" component={Home} />
      </div>
    </Router>
  );
}

export default App;
