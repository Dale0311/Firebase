// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyARS6y707rvAHnzi-TtL-pCyB8CMNhC3_M",
  authDomain: "fir-709fa.firebaseapp.com",
  projectId: "fir-709fa",
  storageBucket: "fir-709fa.appspot.com",
  messagingSenderId: "205068607315",
  appId: "1:205068607315:web:5dd202ab02c0523e854ba6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
