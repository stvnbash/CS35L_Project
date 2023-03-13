// @ts-nocheck
import { firestore } from "@/lib/firebase";
import { useRouter } from 'next/router';
import AddClubEvent from 'components/AddClubEvent';
import ErrorPage from 'next/error';


export async function getServerSideProps(context) {
    const clubCollection = firestore.collection("clubs").orderBy("name");
    const clubsMetaData = (await clubCollection.get()).docs;
    const clubDocIDs = clubsMetaData.map((doc) => doc.id);
    const clubs = clubsMetaData.map((doc) => doc.data());
    let clubsDict = {};
    for  (let i = 0; i < clubs.length; i++) {
        clubsDict[clubDocIDs[i]] = {  id: clubDocIDs[i], ...clubs[i]  };
    }


    return {
        props: {
            clubsDict: JSON.parse(JSON.stringify(clubsDict)),
        },
    };
}

export default function UniqueClubPage({ clubsDict }) {
    const router = useRouter();
    const { clubId } = router.query;
    console.log(clubsDict);
    console.log("CLUB ID", clubId);

    if (Object.keys(clubsDict).includes(clubId)) {
        const clubName = clubsDict[clubId].name;

        return (
            <>
                <AddClubEvent clubId={clubId} clubName={clubName}/>
            </>
        )
    } else {
        return (<ErrorPage statusCode={404} />)
    }

}
