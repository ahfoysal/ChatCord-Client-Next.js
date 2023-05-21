// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDQv4BMN7Vs2VlFatyU_S0w0NKywFPzUzU",
  authDomain: "chatcord-21e21.firebaseapp.com",
  projectId: "chatcord-21e21",
  storageBucket: "chatcord-21e21.appspot.com",
  messagingSenderId: "883070602849",
  appId: "1:883070602849:web:24e62d0b5f292de0d62420"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app);