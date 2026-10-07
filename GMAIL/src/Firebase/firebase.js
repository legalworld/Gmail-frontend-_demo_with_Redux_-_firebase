import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDQyMwPx3w1zlhiApx-iIwK2PSxKH6Xh8c",
  authDomain: "clone-ea2c1.firebaseapp.com",
  projectId: "clone-ea2c1",
  storageBucket: "clone-ea2c1.firebasestorage.app",
  messagingSenderId: "375623979157",
  appId: "1:375623979157:web:b6ed78733544c15eb74b9c",
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { db, auth, provider };
