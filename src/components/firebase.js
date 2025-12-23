// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCAjJUmq7b1wl-KzPP4EVb83uOzMPEFjBs",
  authDomain: "egib-ndg.firebaseapp.com",
  projectId: "egib-ndg",
  storageBucket: "egib-ndg.firebasestorage.app",
  messagingSenderId: "875036096740",
  appId: "1:875036096740:web:b89ea4ff64a22f4c8314f1",
  measurementId: "G-9JHM03LK3P"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export { db, app };