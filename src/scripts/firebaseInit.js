// uvoženo
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

// konfiguracija za naš projekt
const firebaseConfig = {
    apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
    authDomain: process.env.VUE_APP_AUTH_DOMAIN,
    projectId: process.env.VUE_APP_PROJECT_ID,
    storageBucket: process.env.VUE_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.VUE_APP_MESSAGING_SENDER_ID,
    appId: process.env.VUE_APP_APP_ID,
    measurementId: process.env.VUE_APP_MEASUREMENT_ID
};

// inicijalizacija firebase projekta
const firebaseApp = firebase.initializeApp(firebaseConfig);

// uporaba baze podatkov firestore & firebase avtentikacije
const db = firebaseApp.firestore();
const auth = firebase.auth();

// Izvoz za uporabo v komponentah in drugje
export { auth, db, firebase };
