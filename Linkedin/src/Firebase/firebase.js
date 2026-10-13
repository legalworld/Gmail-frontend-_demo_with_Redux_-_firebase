// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDe3B7vTeuUjCZ7-0YwaZ1XkcvOkIgTwG0",
  authDomain: "linkedin-clone-720ec.firebaseapp.com",
  projectId: "linkedin-clone-720ec",
  storageBucket: "linkedin-clone-720ec.firebasestorage.app",
  messagingSenderId: "552677350273",
  appId: "1:552677350273:web:c4b9b5e0df4fd257a46680",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
