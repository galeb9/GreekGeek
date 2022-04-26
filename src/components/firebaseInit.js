import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCSc18fYY4jmEXj1Z7laZWcplgISyGBl7I",
    authDomain: "pushups-150a1.firebaseapp.com",
    projectId: "pushups-150a1",
    storageBucket: "pushups-150a1.appspot.com",
    messagingSenderId: "680008298929",
    appId: "1:680008298929:web:facbfa24f60e4742cc0d90",
    measurementId: "G-M72C3CD628"
};

// Use this to initialize the firebase App
const firebaseApp = firebase.initializeApp(firebaseConfig);

// Use these for db & auth
const db = firebaseApp.firestore();
const auth = firebase.auth();

export { auth, db, firebase };