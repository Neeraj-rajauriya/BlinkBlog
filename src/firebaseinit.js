// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,  //secret key ....don't share with other , can manipulate your code 
  authDomain: "blogging-app-6647d.firebaseapp.com",
  projectId: "blogging-app-6647d",
  storageBucket: "blogging-app-6647d.appspot.com",
  messagingSenderId: "165845970145",
  appId: "1:165845970145:web:efe503e9cd6bfbd1685ba0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);