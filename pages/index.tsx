// @ts-nocheck

import Intro from "../components/Intro";
import MyClubs from "../components/MyClubs";
import AllClubs from "../components/AllClubs";

import { UserContext } from "@/lib/context";
import { useContext, useEffect } from "react";

import { firestore } from "@/lib/firebase";

export async function getServerSideProps(context) {
  // club collection to get all clubs (alphabetic order)
  const clubCollection = firestore.collection("clubs").orderBy("name");

  // mapping docs to array of objects
  const clubs = (await clubCollection.get()).docs.map((doc) => doc.data());
  return {
    props: {
      clubs: JSON.parse(JSON.stringify(clubs)),
    }, // will be passed to the page component as props
  };
}

export default function Home({ clubs }) {
  // get context from _app
  const { name, email, uid } = useContext(UserContext);

  // // async function to get clubs user is in
  // const getMyClubIDs = async () => {
  //   // get current user
  //   const myClubIDsDoc = firestore.collection("users").doc(`${email}`);

  //   // myClubs is the array of club *** ID's ***
  //   let myClubIDs;
  //   try {
  //     myClubIDs = (await myClubIDsDoc.get()).data().clubs;
  //   }
  //   catch {
  //     console.log("data() is undefined!");
  //   }

  //   return myClubIDs;    
  // };

  // const getMyClubs = () => {
  //   // get the clubs collection
  //   const clubsCollection = firestore.collection("clubs");
  //   let myClubs = [];

  //   // for each element in myClubIDs, find its corresponding data entry
  //   let ids = getMyClubIDs();

  //   for(let i = 0; i < ids.length; i++) {
  //     const clubDoc = clubsCollection.get().doc(ids[i]);
  //     myClubs.push(clubDoc.data())
  //   }

  //   return myClubs;
  // };

  return (
    <div>
      <Intro />
      {name && <MyClubs myClubs={clubs} />}
      <AllClubs clubs={clubs} />
    </div>
  );
}
