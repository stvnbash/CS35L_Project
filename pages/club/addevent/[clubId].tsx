// @ts-nocheck
import { firestore } from "@/lib/firebase";
import { useRouter } from 'next/router';
import AddClubEvent from 'components/AddClubEvent';
import ErrorPage from 'next/error';
import { useContext } from "react";
import { UserContext } from '@/lib/context';


export async function getServerSideProps(context) {
    const { clubId } = context.params
    let club = (await firestore.collection("clubs").doc(clubId).get()).data()
    club = club ? { id: clubId, ...club } : false


    return {
        props: {
            club: club
        },
    };
}

export default function UniqueClubPage({ club }) {
    const router = useRouter();
    const { clubId } = router.query;
    const { email } = useContext(UserContext);
    let clubModerators = [];
    if (club.moderators) clubModerators = club.moderators;

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
