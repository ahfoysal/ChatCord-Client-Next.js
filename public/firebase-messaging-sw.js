importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js"
);

const firebaseConfig = {
  apiKey: "AIzaSyDQv4BMN7Vs2VlFatyU_S0w0NKywFPzUzU",
  authDomain: "chatcord-21e21.firebaseapp.com",
  projectId: "chatcord-21e21",
  storageBucket: "chatcord-21e21.appspot.com",
  messagingSenderId: "883070602849",
  appId: "1:883070602849:web:0d059644500356fdd62420",
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.image,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
