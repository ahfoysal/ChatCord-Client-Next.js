import 'firebase/messaging';
import firebase from 'firebase/app';
import localforage from 'localforage';

const firebaseCloudMessaging = {
  tokenInlocalforage: async () => {
    const  storage = await localforage.getItem('fcm_token');
    console.log(storage)
    return localforage.getItem('fcm_token');
  },

  init: async function () {
    if (typeof window !== 'undefined' && !firebase.apps.length) {
      firebase.initializeApp({
        apiKey: "AIzaSyDQv4BMN7Vs2VlFatyU_S0w0NKywFPzUzU",
        authDomain: "chatcord-21e21.firebaseapp.com",
        projectId: "chatcord-21e21",
        storageBucket: "chatcord-21e21.appspot.com",
        messagingSenderId: "883070602849",
        appId: "1:883070602849:web:24e62d0b5f292de0d62420"
      });

      try {
        if ((await this.tokenInlocalforage()) !== null) {
          return false;
        }

        const messaging = firebase.messaging();
        await Notification.requestPermission();
        const token = await messaging.getToken();

        localforage.setItem('fcm_token', token);
        console.log('fcm_token', token);
      } catch (error) {
        console.error(error);
      }
    }
  },
};

export { firebaseCloudMessaging };
