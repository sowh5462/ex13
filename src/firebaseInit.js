// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDhp_vWbluRe-NlXaedGhGKXlOLUP5NYts",
  authDomain: "fir-8c4b3.firebaseapp.com",
  databaseURL: "https://fir-8c4b3-default-rtdb.firebaseio.com",
  projectId: "fir-8c4b3",
  storageBucket: "fir-8c4b3.appspot.com",
  messagingSenderId: "779351035899",
  appId: "1:779351035899:web:d3318fc3d17415c530c55e",
  measurementId: "G-R3XCP77ZB8"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);