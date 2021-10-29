import React from "react";
import Login from "./components/Login";
import Home from "./components/Home";
import "./App.css";
import { Route, BrowserRouter as Router } from "react-router-dom";

function App() {
  return (
    <Router>
      <div>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
      </div>
    </Router>
  );
}

export default App;
