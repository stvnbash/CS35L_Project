import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';
// stored this info in local variable for security purposes:
const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    //apiKey: "AIzaSyC2MiSUqu4poj5jSkwtWAbPHj2onCfth_M",
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID
};

// Initialize Firebase
if(!firebase.apps.length)
    firebase.initializeApp(firebaseConfig)

// firebase auth
export const auth = firebase.auth();

// auth provider (google)
export const provider = new firebase.auth.GoogleAuthProvider().setCustomParameters({
    'hd': 'g.ucla.edu'
  });

// firestore
export const firestore = firebase.firestore();

// storage
export const storage = firebase.storage();