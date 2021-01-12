import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBZV5FIrrmt19MiyN2f3luFhe4zzZkvIV8",
  authDomain: "cricket-5775.firebaseapp.com",
  projectId: "cricket-5775",
  storageBucket: "cricket-5775.appspot.com",
  messagingSenderId: "1081553819956",
  appId: "1:1081553819956:web:ff05a49df63cb540cf6d61",
  measurementId: "G-M62FCM50GN",
};

// init
const firebaseApp = firebase.initializeApp(firebaseConfig);
// utils
const db = firebaseApp.firestore();
// collection references
const matchesCollection = db.collection("matches");

export { db, matchesCollection };
