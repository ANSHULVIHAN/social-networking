// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA7xIxJVIjItu-CTTvLJzTYz3jb3Br9ugs",
  authDomain: "linkdln-fefae.firebaseapp.com",
  projectId: "linkdln-fefae",
  storageBucket: "linkdln-fefae.appspot.com",
  messagingSenderId: "818155875938",
  appId: "1:818155875938:web:af054a714cf5f135e76b3b",
  measurementId: "G-YEXZ0YDRFC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);
export { auth, app, firestore, storage };