import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyB-GYvZ1Q0aVYKqvXg9hnkLh23E0n5clHo",
    authDomain: "agenda-de-contatos-f2e73.firebaseapp.com",
    projectId: "agenda-de-contatos-f2e73",
    storageBucket: "agenda-de-contatos-f2e73.firebasestorage.app",
    messagingSenderId: "1044099531618",
    appId: "1:1044099531618:web:40ecc331a39b2e4878223b",
    measurementId: "G-1RM3Y0PN2K"
  };

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
