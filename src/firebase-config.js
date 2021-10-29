import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC01rFFsvgyPLDbBfJSwOSjq9PM3Hlbpjs",
  authDomain: "soccer-app-dc4e1.firebaseapp.com",
  projectId: "soccer-app-dc4e1",
  storageBucket: "soccer-app-dc4e1.appspot.com",
  messagingSenderId: "669486666785",
  appId: "1:669486666785:web:6db2173dcee7c71d483f60",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
