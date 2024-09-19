// Firebase.js
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyClHGnyn6WNAYozsmUBOcvMqz9VYak25ko",
  authDomain: "blinkit-app-7517e.firebaseapp.com",
  databaseURL: "https://blinkit-app-7517e-default-rtdb.firebaseio.com",
  projectId: "blinkit-app-7517e",
  storageBucket: "blinkit-app-7517e.appspot.com",
  messagingSenderId: "372369351977",
  appId: "1:372369351977:web:3e4721be0408fb9852c338",
  measurementId: "G-SSC17MSS90"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { app, database };
