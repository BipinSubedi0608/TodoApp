import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAoj5oNEjl2k2j1fHOPYGADkKEvvRsiK3E",
    authDomain: "todo-app-6b2b0.firebaseapp.com",
    projectId: "todo-app-6b2b0",
    storageBucket: "todo-app-6b2b0.appspot.com",
    messagingSenderId: "1048417527678",
    appId: "1:1048417527678:web:d700543aab39808b65f52f",
    measurementId: "G-2XQVGWC95T"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { db, auth, googleProvider };
