import { initializeApp } from "firebase/app";
import { getFirestore, collection } from "firebase/firestore";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

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

const signUp = async (email, password) => {
  try {
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    return cred.user.accessToken;
  } catch (err) {
    throw new Error(err.message);
  }
};

const signInuser = async (email, password) => {
  try {
    const cred = await signInWithEmailAndPassword(auth, email, password);
    return cred.user.accessToken;
  } catch (err) {
    throw new Error(err.message);
  }
};

const logoutUser = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    throw new Error(error.message)
  }
} 

export { db, colRef, signUp, signInuser, auth, logoutUser };
