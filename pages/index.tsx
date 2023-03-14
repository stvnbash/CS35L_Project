// @ts-nocheck

import Intro from "../components/Intro";
import ClubCardGrid from "../components/ClubCardGrid";

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

  const clubsAllData = clubsMetaData.map((doc) => [doc.id, doc.data()]);

  let clubsDict = {};
  for (let i = 0; i < clubs.length; i++) {
    clubsDict[clubDocIDs[i]] = { id: clubDocIDs[i], ...clubs[i] };
  }

  for (let i = 0; i < clubsAllData.length; i++) {
    clubsAllData[i] = { id: clubsAllData[i][0], ...clubsAllData[i][1] }
  }

  return {
    props: {
      clubs: JSON.parse(JSON.stringify(clubsAllData)),
      clubsDict: JSON.parse(JSON.stringify(clubsDict)),
    }, // will be passed to the page component as props
  };
}

export default function Home({ clubs, clubsDict }) {
  // get context from _app
  const { name, email, uid, joinedClubs } = useContext(UserContext);

  let myClubs = []
  for (let club of clubs) {
    if (joinedClubs && joinedClubs.includes(club.id)) {
      myClubs.push(club)
    }
  }

  const [search, setSearch] = useState('')




  return (
    <div>
      <Intro />
      <input className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-1 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
        id="search"
        autoComplete="off"
        type="search"
        placeholder="Search"
        onChange={() => { setSearch(document.getElementById('search').value); }}>
      </input>
      {(search === '') && email && <ClubCardGrid clubs={myClubs} search='' blockTitle="My Clubs" noClubsMessage="Immerse yourself in UCLA!  Clubs you join will appear here!" />}
      <ClubCardGrid clubs={clubs} search={search.toLowerCase()} blockTitle="All Clubs" noClubsMessage="Error loading clubs at UCLA" />
    </div>
  );
}
