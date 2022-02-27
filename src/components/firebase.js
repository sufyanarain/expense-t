// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCibosqw8oiXgXhqH55Jf9sahO_GPUlr6w",
  authDomain: "expense-management822.firebaseapp.com",
  projectId: "expense-management822",
  storageBucket: "expense-management822.appspot.com",
  messagingSenderId: "407264026894",
  appId: "1:407264026894:web:4d747c534fc0727e54375f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { db, auth, storage };