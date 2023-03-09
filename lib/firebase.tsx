import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';
// stored this info in local variable for security purposes:

const firebaseConfig = {
  apiKey: "AIzaSyC2MiSUqu4poj5jSkwtWAbPHj2onCfth_M",
  authDomain: "uclaclubhub.firebaseapp.com",
  projectId: "uclaclubhub",
  storageBucket: "uclaclubhub.appspot.com",
  messagingSenderId: "869039112467",
  appId: "1:869039112467:web:957252f995c9792ae45ae6"
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



