// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAPkCic7Okr9K6NGbYyJ_tdh7BZSR_KXV4",
    authDomain: "ingridientarium.firebaseapp.com",
    projectId: "ingridientarium",
    storageBucket: "ingridientarium.firebasestorage.app",
    messagingSenderId: "919056125861",
    appId: "1:919056125861:web:e48faf90520e516f04224c",
    measurementId: "G-VEHDHVJZK9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);