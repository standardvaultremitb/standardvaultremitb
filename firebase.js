import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCao6m2oOFwSMGGiX3wUBCP1U0gwIEYHYs",
  authDomain: "bank-demo-cb3e9.firebaseapp.com",
  projectId: "bank-demo-cb3e9",
  storageBucket: "bank-demo-cb3e9.firebasestorage.app",
  messagingSenderId: "371149394364",
  appId: "1:371149394364:web:8793f2488decff1bab9bb9"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

