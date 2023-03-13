// @ts-nocheck

import { firestore } from "@/lib/firebase";
import { useRouter } from 'next/router';
import ClubPage from 'components/ClubPage';
import ClubJoin from 'components/ClubJoin';
import ErrorPage from 'next/error'
import { useContext } from "react";


export async function getServerSideProps(context) {
  const { clubid } = context.params
  // console.log("aaa", clubid)
  let club = (await firestore.collection("clubs").doc(clubid).get()).data()
  // console.log("aaa", club)
  club = club ? { id: clubid, ...club } : false
  // console.log("aa", club)

  // club collection to get all clubs (alphabetic order)
  // const clubCollection = firestore.collection("clubs").orderBy("name");

  // // get metadata for clubs
  // const clubsMetaData = (await clubCollection.get()).docs;

  // // get doc ids
  // const clubDocIDs = clubsMetaData.map((doc) => doc.id);

  // // mapping docs to array of objects
  // const clubs = clubsMetaData.map((doc) => doc.data());

  // const clubsAllData = clubsMetaData.map((doc) => [doc.id, doc.data()]);

  // const clubsAllData = clubsMetaData.map((doc) => [doc.id, doc.data()]);

  // clubsAllData = clubsAllData.map(i => {{id: i[0], ...i[1]}} )

  // let clubsDict = {};
  // for (let i = 0; i < clubs.length; i++) {
  //   clubsDict[clubDocIDs[i]] = { id: clubDocIDs[i], ...clubs[i] };
  // }

  // for (let i = 0; i < clubsAllData.length; i++) {
  //   clubsAllData[i] = { id: clubsAllData[i][0], ...clubsAllData[i][1] }
  // }
  // for (let i = 0; i < clubsAllData.length; i++) {
  //   clubsAllData[i] = { id: clubsAllData[i][0], ...clubsAllData[i][1] }
  // }

  return {
    props: {
      club: club
      // clubs: JSON.parse(JSON.stringify(clubsAllData)),
      // clubsDict: JSON.parse(JSON.stringify(clubsDict)),
    }, // will be passed to the page component as props
  };
}

export default function UniqueClubPage({ club }) {
  const router = useRouter()
  const { clubid } = router.query
  console.log(clubid)
  // clubsDict = {}
  console.log(club)

  // if (Object.keys(clubsDict).includes(clubid)) {
  //   const clubName = clubsDict[clubid].name
  //   const clubDescription = clubsDict[clubid].description
  //   const clubWebsite = clubsDict[clubid].website
  //   const clubInstagram = clubsDict[clubid].instagram
  //   const clubModerators = clubsDict[clubid].moderators
  if (club) {

    return (
      <>
        <ClubPage clubid={clubid}
          clubname={club.name}
          description={club.description}
          website={club.website}
          instagram={club.instagram}
          moderators={club.moderators} />
      </>
    )
  } else {
    return (<ErrorPage statusCode={404} />)
  }

}

// let clubName = null;
// let clubDescription = null;

// for (let i = 0; i < clubs.length; i++) {
//   // console.log(clubs[i]["name"]);
//   if (clubs[i]["id"] == clubid) {
//     clubName = clubs[i]["name"];
//     clubDescription = clubs[i]["description"];
//   }
// }

// if (clubName == null || clubDescription == null) {
//   return <ErrorPage statusCode={404} />
// }

// return (
//   <>
//     <ClubPage name={clubName} description={clubDescription} />
//   </>
// )
// }
// export default UniqueClubPage

// let clubName = null;
// let clubDescription = null;

// for (let i = 0; i < clubs.length; i++) {
//   // console.log(clubs[i]["name"]);
//   if (clubs[i]["id"] == clubid) {
//     clubName = clubs[i]["name"];
//     clubDescription = clubs[i]["description"];
//   }
// }

// if (clubName == null || clubDescription == null) {
//   return <ErrorPage statusCode={404} />
// }

// return (
//   <>
//     <ClubPage name={clubName} description={clubDescription} />
//   </>
// )
// }
// export default UniqueClubPage
