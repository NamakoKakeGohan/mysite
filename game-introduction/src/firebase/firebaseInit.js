import { firestorePlugin } from "vuefire";
import firebase from "firebase/app";
import "firebase/firestore";

createApp.use(firestorePlugin);

firebase.initializeApp({
  apiKey:            "AIzaSyCUHmw42Cv1U9Jiccm1jBkRmvvrWwBrDXE",
  authDomain:        "steam-game-recs.firebaseapp.com",
  projectId:         "steam-game-recs",
  storageBucket:     "steam-game-recs.firebasestorage.app",
  messagingSenderId: "519970776344",
  appId:             "1:519970776344:web:0b6da5bbb56b970be4aa6d",
  measurementId:     "G-9MQRG9NT7R",
});

export const firebaseDb = firebase.firestore();
export const auth = firebase.auth();


// import firebase from 'firebase/app';
// import 'firebase/firestore';

// const firebaseConfig = {
//   apiKey: "YOUR_API_KEY",
//   authDomain: "YOUR_AUTH_DOMAIN",
//   projectId: "YOUR_PROJECT_ID",
//   storageBucket: "YOUR_STORAGE_BUCKET",
//   messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
//   appId: "YOUR_APP_ID",
//   measurementId: "YOUR_MEASUREMENT_ID"
// };

// firebase.initializeApp(firebaseConfig);

// const firebaseDb = firebase.firestore();

// export { firebaseDb };