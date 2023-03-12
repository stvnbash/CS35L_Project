import { firestore } from "@/lib/firebase";
import { useRouter } from 'next/router';
import { UserContext } from "@/lib/context";
import { useContext, useEffect, useState } from "react";
import ClubPage from 'components/ClubPage';
import { getDoc, doc } from 'firebase/firestore';
import { async } from "@firebase/util";

export async function getServerSideProps() {

  // club collection to get all clubs (alphabetic order)
  const clubCollection = firestore.collection("clubs").orderBy("name");

  // get metadata for clubs
  const clubsMetaData = (await clubCollection.get()).docs;


  // get doc ids
  //  const clubDocIDs = clubsMetaData.map((doc) => doc.id);
  //const clubsDict = clubsMetaData.map((doc) => doc.id);

  //  console.log(clubsDict);

  // mapping docs to array of objects
  const clubs = clubsMetaData.map((doc) => doc.data());
  //  console.log(clubname);
  //  console.log("clubid: ", clubid);

  return {
    props: {
      clubs: JSON.parse(JSON.stringify(clubs))
      //  clubsDict: JSON.parse(JSON.stringify(clubsDict))
    }, // will be passed to the page component as props
  };
}

function UniqueClubPage({ clubs }) {
   const router = useRouter()
   const {clubid}  = router.query

   let clubName;
   let clubDescription;

   for(let i = 0; i < clubs.length; i++)
   {
    // console.log(clubs[i]["name"]);
    if(clubs[i]["name"]==clubid)
    {
      clubName = clubs[i]["name"];
      clubDescription = clubs[i]["description"];
    }
   }
  //  console.log(clubs);
  //  console.log("clubid: ", clubid);
  return (
    <>
      <ClubPage name={clubName} description={clubDescription} />
    </>
  )
}
export default UniqueClubPage

