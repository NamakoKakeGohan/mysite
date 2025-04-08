import { initializeApp } from "firebase/app";
import { getFirestore }  from "firebase/firestore";
import { getAuth }       from "firebase/auth";

const firebaseConfig = { // Firebaseの設定
  apiKey:            "AIzaSyCUHmw42Cv1U9Jiccm1jBkRmvvrWwBrDXE",
  authDomain:        "steam-game-recs.firebaseapp.com",
  projectId:         "steam-game-recs",
  storageBucket:     "steam-game-recs.firebasestorage.app",
  messagingSenderId: "519970776344",
  appId:             "1:519970776344:web:0b6da5bbb56b970be4aa6d",
  measurementId:     "G-9MQRG9NT7R",
};

// Firebaseの初期化
const app = initializeApp(firebaseConfig);

// FirestoreとAuthenticationのインスタンスをエクスポート
export const firebaseDb = getFirestore(app);
export const auth = getAuth(app);
