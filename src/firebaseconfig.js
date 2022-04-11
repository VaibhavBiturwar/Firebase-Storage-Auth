import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD1dkoUMGoCwhBn5sGbawBYFxMY_LoFuPM",
  authDomain: "rn-firebase-storage.firebaseapp.com",
  projectId: "rn-firebase-storage",
  storageBucket: "rn-firebase-storage.appspot.com",
  messagingSenderId: "927213434841",
  appId: "1:927213434841:web:a15886fea7c35cb131cbc8",
  measurementId: "G-NYP3Y6QPSY",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getDatabase(app);
export const myfirestore = getFirestore(app);
