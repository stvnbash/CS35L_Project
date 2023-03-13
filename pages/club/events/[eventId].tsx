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

    let event = (await firestore.collection("clubs").doc(urlParts[0]).collection('events').doc(urlParts[1]).get()).data()
    event = event ? { clubId: urlParts[0], evenId: urlParts[1], ...event } : false
    // console.log("aaa", event)

    return {
        props: {
            clubid: urlParts[0],
            eventid: urlParts[1],
            event: event
            // clubEventsDict: clubEventsDict,
        },
    };
}

export default function UniqueClubEventPage({ clubid, eventid, event }) {
    // console.log("Dict", clubEventsDict);
    // console.log("Event ID", event);
    // console.log("Club ID", club);

    if (event) {
        return (
            <>
                <EventPage clubEvent={event} event={eventid} club={clubid} />
            </>
        )
    } else {
        return (<ErrorPage statusCode={404} />)
    }

}
