import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAk7OwUXPTUiuxi5FMJniyItzaWOk8OqUs",
    authDomain: "ingsw-cb49e.firebaseapp.com",
    projectId: "ingsw-cb49e",
    storageBucket: "ingsw-cb49e.firebasestorage.app",
    messagingSenderId: "786070091242",
    appId: "1:786070091242:web:4e12a9b38d8e97ecf92e93",
    measurementId: "G-KTFRTH3HHD"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export default app;