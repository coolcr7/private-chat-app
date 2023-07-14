// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {GoogleAuthProvider,getAuth} from "firebase/auth"
import {getFirestore} from "firebase/firestore"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBQk2lh6jYaByQi-8DKxKSw2wliwyQmLT0",
  authDomain: "chat-app-1fb56.firebaseapp.com",
  projectId: "chat-app-1fb56",
  storageBucket: "chat-app-1fb56.appspot.com",
  messagingSenderId: "683513461686",
  appId: "1:683513461686:web:4eaef5878d2ef62e93df17",
  measurementId: "G-HDELP247SF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db=getFirestore() 
export const auth=getAuth(app);
export const googleProvider=new GoogleAuthProvider();

