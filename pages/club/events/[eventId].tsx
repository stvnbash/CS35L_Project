// @ts-nocheck
import { firestore } from "@/lib/firebase";
import EventPage from 'components/EventPage';
import ErrorPage from 'next/error';


export async function getServerSideProps(context) {
    const { params } = context;
    const eventId = params.eventId;
    // const { eventId } = params.context
    const urlParts = eventId.split("_");

    // const clubEventsCollection = await firestore.collection('clubs').doc(urlParts[0]).collection('events').get();
    // const clubEvents = clubEventsCollection.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    // const clubEventsDict = {};
    // for (let event of clubEvents) {
    //     clubEventsDict[event.id] = { event };
    // }

    let club = (await firestore.collection("clubs").doc(urlParts[0]).get()).data()
    let event = (await firestore.collection("clubs").doc(urlParts[0]).collection('events').doc(urlParts[1]).get()).data()
    club = club ? { clubId: urlParts[0], ...club } : false
    event = event ? { clubId: urlParts[0], evenId: urlParts[1], ...event } : false
    // console.log("aaa", club)
    // console.log("bbb", event)

    return {
        props: {
            clubid: urlParts[0],
            eventid: urlParts[1],
            club: club,
            event: event
            // clubEventsDict: clubEventsDict,
        },
    };
}

export default function UniqueClubEventPage({ clubid, eventid, club, event }) {
    // console.log("Dict", clubEventsDict);
    // console.log("Event ID", event);
    // console.log("Club ID", club);

    if (club && event) {
        return (
            <>
                <EventPage clubEvent={event} event={eventid} club={clubid} clubData={club} />
            </>
        )
    } else {
        return (<ErrorPage statusCode={404} />)
    }

}
