// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "@firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAhrOIhCqiJMr98EjKtRGJEPd2oKuIgvGk",
  authDomain: "transportation-b00bb.firebaseapp.com",
  projectId: "transportation-b00bb",
  storageBucket: "transportation-b00bb.appspot.com",
  messagingSenderId: "19177772575",
  appId: "1:19177772575:web:c09351bddc180882fc672a",
  measurementId: "G-0GDR74PCPT",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// db connect

export const db = getFirestore(app);
