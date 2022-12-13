// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAE2Jsq3s1eDVCHuwJxxFd41WUprgcwFWU",
  authDomain: "yama-auth.firebaseapp.com",
  projectId: "yama-auth",
  storageBucket: "yama-auth.appspot.com",
  messagingSenderId: "825525722660",
  appId: "1:825525722660:web:a2d6b410eeda82d90242b1",
};

// Initialize Firebase

let app;

if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

const auth = firebase.auth();

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export { auth, db };
