// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBGYLYLybIVdlepunJ3oxOzWMtzAgFc4xI",
  authDomain: "diya-tila-web.firebaseapp.com",
  projectId: "diya-tila-web",
  storageBucket: "diya-tila-web.appspot.com",
  messagingSenderId: "782272561755",
  appId: "1:782272561755:web:f5188140ba523d36fcf57e",
  measurementId: "G-GT3Q94NF8D"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
let firebaseAnalytics;

if (typeof window !== "undefined") {
  firebaseAnalytics = getAnalytics(firebaseApp);
}

export { firebaseApp, firebaseAnalytics };