// @ts-nocheck

import { firestore } from "@/lib/firebase";
import { useRouter } from 'next/router';
import ClubPage from 'components/ClubPage';
import ErrorPage from 'next/error'


export async function getServerSideProps(context) {
  const { clubid } = context.params
  let club = (await firestore.collection("clubs").doc(clubid).get()).data()
  club = club ? { id: clubid, ...club } : false
  

  return {
    props: {
      club: club
    }, // will be passed to the page component as props
  };
}

export default function UniqueClubPage({ club }) {
  const router = useRouter()
  const { clubid } = router.query
  console.log(clubid)
  console.log(club)

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