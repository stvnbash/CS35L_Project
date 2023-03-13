// @ts-nocheck
import { firestore } from "@/lib/firebase";
import { useRouter } from 'next/router';
import AddClubEvent from 'components/AddClubEvent';
import ErrorPage from 'next/error';
import { useContext } from "react";
import { UserContext } from '@/lib/context';


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
    const { email } = useContext(UserContext);
    let clubModerators = [];
    if (club.moderators) clubModerators = club.moderators;
    // console.log("CLUB ID", clubId);

    if (club && (clubModerators).includes(email)) {
        const clubName = club.name;
        console.log(club.moderators)

        return (
            <>
                <AddClubEvent clubId={clubId} clubName={clubName} moderators={club.moderators} />
            </>
        )
    } else {
        return (<ErrorPage statusCode={404} />)
    }

}
