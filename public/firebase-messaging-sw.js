/* global importScripts, firebase */
importScripts('https://www.gstatic.com/firebasejs/7.9.1/firebase-app.js')
importScripts('https://www.gstatic.com/firebasejs/7.9.1/firebase-messaging.js')

firebase.initializeApp({
  apiKey: "AIzaSyDQv4BMN7Vs2VlFatyU_S0w0NKywFPzUzU",
  authDomain: "chatcord-21e21.firebaseapp.com",
  projectId: "chatcord-21e21",
  storageBucket: "chatcord-21e21.appspot.com",
  messagingSenderId: "883070602849",
  appId: "1:883070602849:web:24e62d0b5f292de0d62420"
})

firebase.messaging()
