import React from "react";
import Login from "./components/Login";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

import "./App.css";

// Firebase SDK
const firebaseConfig = {
  apiKey: "AIzaSyAJOA7rw7nMqG-2TKSRA4o-y6FtTmXOsH8",
  authDomain: "soccer-app-419d5.firebaseapp.com",
  projectId: "soccer-app-419d5",
  storageBucket: "soccer-app-419d5.appspot.com",
  messagingSenderId: "545915257270",
  appId: "1:545915257270:web:691aa48f9ef07bccb48117",
  measurementId: "G-PE3K1XL44S",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// const auth = getAuth();
// createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
//   //Signed In
//   const user = userCredential.user;
// });

function App() {
  return (
    <div className="App">
      <Login></Login>
    </div>
  );
}

export default App;
