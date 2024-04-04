// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-91a63.firebaseapp.com",
  projectId: "mern-estate-91a63",
  storageBucket: "mern-estate-91a63.appspot.com",
  messagingSenderId: "495027929894",
  appId: "1:495027929894:web:e6656ece643ed08d1fb7e7",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
