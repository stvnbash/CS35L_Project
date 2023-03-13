// @ts-nocheck
import { firestore } from "@/lib/firebase";
import EventPage from 'components/EventPage';
import ErrorPage from 'next/error';


export async function getServerSideProps(context) {
    const { params } = context;
    const eventId = params.eventId;
    const urlParts = eventId.split("_");

    const clubEventsCollection = await firestore.collection('clubs').doc(urlParts[0]).collection('events').get();
    const clubEvents = clubEventsCollection.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    const clubEventsDict = {};
    for (let event of clubEvents) {
        clubEventsDict[event.id] = { event };
    }

    return {
        props: {
            club: urlParts[0],
            event: urlParts[1],
            clubEventsDict: clubEventsDict,
        },
    };
}

export default function UniqueClubEventPage({ club, event, clubEventsDict }) {
    if (Object.keys(clubEventsDict).includes(event)) {
        return (
            <>
                <EventPage clubEvent={clubEventsDict[event]} club={club}/>
            </>
        )
    } else {
        return (<ErrorPage statusCode={404} />)
    }

}
