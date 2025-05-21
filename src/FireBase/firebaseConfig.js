import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAtjfb6xxdR_Pt-z5tne-fJnH_DBtC-ri8",
    authDomain: "celulares-arise.firebaseapp.com",
    projectId: "celulares-arise",
    storageBucket: "celulares-arise.firebasestorage.app",
    messagingSenderId: "83484515283",
    appId: "1:83484515283:web:072a21cd7e966028de6d26"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;
