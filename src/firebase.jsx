// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Suas credenciais do Firebase (substitua pelas suas)
const firebaseConfig = {
   // apiKey: "AIzaSyB-GYvZ1Q0aVYKqvXg9hnkLh23E0n5clHo",
    authDomain: "agenda-de-contatos-f2e73.firebaseapp.com",
    projectId: "agenda-de-contatos-f2e73",
    storageBucket: "agenda-de-contatos-f2e73.firebasestorage.app",
    messagingSenderId: "1044099531618",
    appId: "1:1044099531618:web:40ecc331a39b2e4878223b",
    measurementId: "G-1RM3Y0PN2K"
  };

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);

// Obter instâncias do Firebase Auth e Firestore
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
