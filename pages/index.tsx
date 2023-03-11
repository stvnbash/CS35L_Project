// @ts-nocheck

import Intro from "../components/Intro";
import MyClubs from "../components/MyClubs";
import AllClubs from "../components/AllClubs";

import { UserContext } from "@/lib/context";
import { useContext, useEffect, useState } from "react";

import { firestore } from "@/lib/firebase";

export async function getServerSideProps(context) {
  // club collection to get all clubs (alphabetic order)
  const clubCollection = firestore.collection("clubs").orderBy("name");

  // get metadata for clubs
  const clubsMetaData = (await clubCollection.get()).docs;

  // get doc ids
  const clubDocIDs = clubsMetaData.map((doc) => doc.id);

  // mapping docs to array of objects
  const clubs = clubsMetaData.map((doc) => doc.data());
  
  let clubsDict = {};
  for(let i = 0; i < clubs.length; i++)
    clubsDict[clubDocIDs[i]] = clubs[i];

  return {
    props: {
      clubs: JSON.parse(JSON.stringify(clubs)),
      clubsDict: JSON.parse(JSON.stringify(clubsDict))
    }, // will be passed to the page component as props
  };
}

export default function Home({ clubs, clubsDict }) {
  // get context from _app
  const { name, email, uid, joinedClubs } = useContext(UserContext);
  const [myClubs, setMyClubs] = useState([]);
  //console.log(joinedClubs)
  useEffect(() => {
    if (joinedClubs) {
      for(let i = 0; i < joinedClubs.length; i++) {
        console.log(joinedClubs[i])
        console.log(clubsDict[joinedClubs[i]])
        myClubs.push(clubsDict[joinedClubs[i]]);
      }
    }
  }, [joinedClubs]);

  return (
    <div>
      <Intro />
      {email && <MyClubs myClubs={myClubs} />}
      <AllClubs clubs={clubs} />
    </div>
  );
}
