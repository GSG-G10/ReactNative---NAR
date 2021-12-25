import { initializeApp } from "firebase/app";
import { getFirestore, collection } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBu_pIDJKcnM-lbJYCTmgiQMsnQLoPH6hI",
  authDomain: "reactnative-6ce6d.firebaseapp.com",
  projectId: "reactnative-6ce6d",
  storageBucket: "reactnative-6ce6d.appspot.com",
  messagingSenderId: "971668617895",
  appId: "1:971668617895:web:ef1818173b152b02293982",
  measurementId: "G-HHTEXRH5RB",
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const colRef = collection(db, "projects");
const auth = getAuth();

export {db, colRef}