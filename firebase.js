// Import the functions you need from the SDKs you need
import firebase from "firebase/app";
import "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAK4IOkCZW9KTkJReWRqn5lOjeNbiLFvI4",
  authDomain: "medium-clone-3d1fd.firebaseapp.com",
  projectId: "medium-clone-3d1fd",
  storageBucket: "medium-clone-3d1fd.appspot.com",
  messagingSenderId: "131494388739",
  appId: "1:131494388739:web:8a03c58d2de45af1f81a36",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

export {auth,provider,db}
