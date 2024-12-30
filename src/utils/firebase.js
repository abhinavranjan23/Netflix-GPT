// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCOYyfGBtteq8m8796ir4mcfpOsUjHRmJY",
  authDomain: "abvideogp.firebaseapp.com",
  projectId: "abvideogp",
  storageBucket: "abvideogp.firebasestorage.app",
  messagingSenderId: "412624778912",
  appId: "1:412624778912:web:29707e4811c146f4103bc5",
  measurementId: "G-L7SSPHVDSY",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();
