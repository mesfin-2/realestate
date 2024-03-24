// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "addis-realestate.firebaseapp.com",
  projectId: "addis-realestate",
  storageBucket: "addis-realestate.appspot.com",
  messagingSenderId: "164537415243",
  appId: "1:164537415243:web:196b918219ea7f82c07fce",
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
