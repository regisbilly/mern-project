
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBN9v9Vd836-aL81rtAGisE634S2p1BmgI",
  authDomain: "job-portal-demo-5965e.firebaseapp.com",
  projectId: "job-portal-demo-5965e",
  storageBucket: "job-portal-demo-5965e.firebasestorage.app",
  messagingSenderId: "635449215318",
  appId: "1:635449215318:web:00f8635ebddf04a233eef7",
  measurementId: "G-BH6Z6BN3Q1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// ✅ Export the app instance as default
export default app;

