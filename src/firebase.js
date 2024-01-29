// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
import {getStorage} from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC3GrVM6tXGmPRdobX_sOOtMcsoNAV2W1A",
  authDomain: "my-podcast-2366b.firebaseapp.com",
  projectId: "my-podcast-2366b",
  storageBucket: "my-podcast-2366b.appspot.com",
  messagingSenderId: "482897827796",
  appId: "1:482897827796:web:5b926efd56ef89e59d2841",
  measurementId: "G-H1WJ2PSESV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export {db,auth,storage} ;
