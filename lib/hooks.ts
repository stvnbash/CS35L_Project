//@ts-nocheck

import { auth, firestore, db } from "./firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

// read  auth and pull from users collection
export function useUserData() {
  // auth state to read
  const [user] = useAuthState(auth);

  // user name, email, uid
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [uid, setUID] = useState(null);
  const [joinedClubs, setJoinedClubs] = useState(null);

  // set user from doc
  const setUser = (doc) => {
    setName(doc.data().name);
    setEmail(doc.data().email);
    setUID(doc.data().uid);
    setJoinedClubs(doc.data().clubs)
  };

  // unset user
  const noUser = () => {
    setName(null);
    setEmail(null);
    setUID(null);
    setJoinedClubs(null);
  };

  // pull from doc
  useEffect(() => {
    // tbh i still have no idea what the unsubscribe does
    let unsubscribe;

    // if user isn't null (someone signed in)
    if (user) {
      // if the user is signing in for the first time, add them to the
      // database
      addUser(user);

      // reference the users collection and search for the user's email
      const userDoc = firestore.collection("users").doc(user.email);

      // set unsubscribe to the status of setUser
      unsubscribe = userDoc.onSnapshot((doc) => {
        try {
          setUser(doc);
        }
        catch {
          console.log("document is empty!", doc);
        }
      });
    }
    // user is null
    else noUser();

    // return unsubscribe ig
    return unsubscribe;
  }, [user]);
  return { name: name, email: email, uid: uid, joinedClubs: joinedClubs };
}

// function to pull user data from the database
async function addUser(user) {
  // search for the user reference in the database
  const userRef = doc(db, "users", `${user.email}`);
  // await the document snapshot
  const docSnap = await getDoc(userRef);

  // if the document doesn't exist, create a new user
  if (!docSnap.exists()) {
    // create a new user document
    const userDoc = firestore.doc(`users/${user.email}`);

    // set the document contents to the user's profile
    await setDoc(
      userDoc,
      { name: user?.displayName, email: user?.email, uid: user?.uid },
      // make sure to keep merge on so as to not accidentally overwrite
      { merge: true }
    );

    // logging *** CAN REMOVE ***
    console.log("added user %s", user.email);
  } else {
    // logging *** CAN REMOVE ***
    console.log("not adding new user %s", user.email);
  }
}
