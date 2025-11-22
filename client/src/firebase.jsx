const VITE_FIREBASE_APP_API_KEY = import.meta.env.VITE_FIREBASE_APP_API_KEY;
const VITE_FIREBASE_APP_AUTH_DOMAIN = import.meta.env.VITE_FIREBASE_APP_AUTH_DOMAIN;
const VITE_FIREBASE_APP_PROJECT_ID = import.meta.env.VITE_FIREBASE_APP_PROJECT_ID;
const VITE_FIREBASE_APP_STORAGE_BUCKET = import.meta.env.VITE_FIREBASE_APP_STORAGE_BUCKET;
const VITE_FIREBASE_APP_MESSAGING_SENDER_ID = import.meta.env.VITE_FIREBASE_APP_MESSAGING_SENDER_ID;
const VITE_FIREBASE_APP_APP_ID = import.meta.env.VITE_FIREBASE_APP_APP_ID;


// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBIgg-7ujo5mJUhOg7cGWJn27kaQZo5pMs",
  authDomain: "mernstack-ecommerce-dc571.firebaseapp.com",
  projectId: "mernstack-ecommerce-dc571",
  storageBucket: "mernstack-ecommerce-dc571.firebasestorage.app",
  messagingSenderId: "379412202212",
  appId: "1:379412202212:web:4c793a65959626e7e8a2f1"
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);