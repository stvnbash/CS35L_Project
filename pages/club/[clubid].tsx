// @ts-nocheck

import { firestore } from "@/lib/firebase";
import { useRouter } from 'next/router';
import ClubPage from 'components/ClubPage';
import ClubJoin from 'components/ClubJoin';
import ErrorPage from 'next/error'

export async function getServerSideProps(context) {

  // club collection to get all clubs (alphabetic order)
  const clubCollection = firestore.collection("clubs").orderBy("name");

  // get metadata for clubs
  const clubsMetaData = (await clubCollection.get()).docs;

  // get doc ids
  const clubDocIDs = clubsMetaData.map((doc) => doc.id);

  // mapping docs to array of objects
  const clubs = clubsMetaData.map((doc) => doc.data());

  // const clubsAllData = clubsMetaData.map((doc) => [doc.id, doc.data()]);

  // const clubsAllData = clubsMetaData.map((doc) => [doc.id, doc.data()]);

  // clubsAllData = clubsAllData.map(i => {{id: i[0], ...i[1]}} )

  let clubsDict = {};
  for  (let i = 0; i < clubs.length; i++) {
    clubsDict[clubDocIDs[i]] = {  id: clubDocIDs[i], ...clubs[i]  };
  }

  // for (let i = 0; i < clubsAllData.length; i++) {
  //   clubsAllData[i] = { id: clubsAllData[i][0], ...clubsAllData[i][1] }
  // }
  // for (let i = 0; i < clubsAllData.length; i++) {
  //   clubsAllData[i] = { id: clubsAllData[i][0], ...clubsAllData[i][1] }
  // }

  return {
    props: {
      // clubs: JSON.parse(JSON.stringify(clubsAllData)),
      clubsDict: JSON.parse(JSON.stringify(clubsDict)),
    }, // will be passed to the page component as props
  };
}

export default function UniqueClubPage({ clubsDict }) {
  const router = useRouter()
  const { clubid } = router.query

  if (Object.keys(clubsDict).includes(clubid)) {
    const clubName = clubsDict[clubid].name
    const clubDescription = clubsDict[clubid].description

    return (
      <>
        <ClubJoin></ClubJoin>
        <ClubPage clubid={clubid} name={clubName} description={clubDescription} />
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
