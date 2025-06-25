// src/lib/firebase.ts
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDoDsmdff9IBsH1ZWxCClbyuKtW21K9tEI",
  authDomain: "artistly12.firebaseapp.com",
  projectId: "artistly12",
  storageBucket: "artistly12.firebasestorage.app",
  messagingSenderId: "1088125070083",
  appId: "1:1088125070083:web:d096afb75a195c44591736",
  measurementId: "G-2FFCPV4CHL"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
