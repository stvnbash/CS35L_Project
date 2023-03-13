// @ts-nocheck
import { firestore } from "@/lib/firebase";
import { useRouter } from 'next/router';
import AddClubEvent from 'components/AddClubEvent';
import ErrorPage from 'next/error';


export async function getServerSideProps(context) {
    // const clubCollection = firestore.collection("clubs").orderBy("name");
    // const clubsMetaData = (await clubCollection.get()).docs;
    // const clubDocIDs = clubsMetaData.map((doc) => doc.id);
    // const clubs = clubsMetaData.map((doc) => doc.data());
    // let clubsDict = {};
    // for  (let i = 0; i < clubs.length; i++) {
    //     clubsDict[clubDocIDs[i]] = {  id: clubDocIDs[i], ...clubs[i]  };
    // }
    const { clubId } = context.params
    // console.log("abc", clubId)
    let club = (await firestore.collection("clubs").doc(clubId).get()).data()
    club = club ? { id: clubId, ...club } : false


    return {
        props: {
            club: club
            // clubsDict: JSON.parse(JSON.stringify(clubsDict)),
        },
    };
}

export default function UniqueClubPage({ club }) {
    const router = useRouter();
    const { clubId } = router.query;
    // console.log(clubsDict);
    // console.log("CLUB ID", clubId);

    if (club) {
        const clubName = club.name;

        return (
            <>
                <AddClubEvent clubId={clubId} clubName={clubName} moderators={club.moderators} />
            </>
        )
    } else {
        return (<ErrorPage statusCode={404} />)
    }

}
