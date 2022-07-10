// uvoženo
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

// konfiguracija za naš projekt
const firebaseConfig = {
    apiKey: "AIzaSyCSc18fYY4jmEXj1Z7laZWcplgISyGBl7I",
    authDomain: "pushups-150a1.firebaseapp.com",
    projectId: "pushups-150a1",
    storageBucket: "pushups-150a1.appspot.com",
    messagingSenderId: "680008298929",
    appId: "1:680008298929:web:facbfa24f60e4742cc0d90",
    measurementId: "G-M72C3CD628"
};

// inicijalizacija firebase projekta
const firebaseApp = firebase.initializeApp(firebaseConfig);

// uporaba baze podatkov firestore & firebase avtentikacije
const db = firebaseApp.firestore();
const auth = firebase.auth();

// Izvoz za uporabo v komponentah in drugje
export { auth, db, firebase };


// fejk sdk:
// const firebaseConfig = {
//     apiKey: "AIzaSyDH_73fYdci0SsDz4gk9YOnTx0jQJbxtag",
//     authDomain: "test-ec026.firebaseapp.com",
//     projectId: "test-ec026",
//     storageBucket: "test-ec026.appspot.com",
//     messagingSenderId: "991199788021",
//     appId: "1:991199788021:web:db7fa4b5d81a3c398d3ebc",
//     measurementId: "G-L2C91E0NQF"
// };


// original config:

// const firebaseConfig = {
//     apiKey: "AIzaSyCSc18fYY4jmEXj1Z7laZWcplgISyGBl7I",
//     authDomain: "pushups-150a1.firebaseapp.com",
//     projectId: "pushups-150a1",
//     storageBucket: "pushups-150a1.appspot.com",
//     messagingSenderId: "680008298929",
//     appId: "1:680008298929:web:facbfa24f60e4742cc0d90",
//     measurementId: "G-M72C3CD628"
// };





