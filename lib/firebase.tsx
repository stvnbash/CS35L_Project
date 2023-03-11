//@ts-nocheck

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';
import { getFirestore } from 'firebase/firestore';

// stored this info in local variable for security purposes:
const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

let app;
// Initialize Firebase
if(!firebase.apps.length)
    app = firebase.initializeApp(firebaseConfig)

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

// firestore database
export const db = getFirestore(app);