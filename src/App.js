import React, { useState, useEffect } from "react";
import Login from "./components/Login";
import Home from "./components/Home";
import NotFound from "./components/NotFound";
import "./App.css";
import { Route, BrowserRouter as Router, useHistory } from "react-router-dom";
import { Switch } from "react-router";
import ProtectedRoute from "./components/ProtectedRoute";
import { auth } from "./firebase-config";

function App() {
  const [isAuth, setIsAuth] = useState(null);
  const [user, setUser] = useState("");

  useEffect(() => {
    auth.onAuthStateChanged(function (user) {
      if (user) {
        setIsAuth(true);
        setUser(user);
      }
    });
  });

  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/" component={Login} />
          <ProtectedRoute exact path="/home" component={Home} isAuth={isAuth} />
          <Route component={NotFound} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
