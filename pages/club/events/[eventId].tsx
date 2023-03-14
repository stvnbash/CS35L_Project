// @ts-nocheck
import { firestore } from "@/lib/firebase";
import EventPage from 'components/EventPage';
import ErrorPage from 'next/error';


export async function getServerSideProps(context) {
    const { params } = context;
    const eventId = params.eventId;
    const urlParts = eventId.split("_");

    let club = (await firestore.collection("clubs").doc(urlParts[0]).get()).data()
    let event = (await firestore.collection("clubs").doc(urlParts[0]).collection('events').doc(urlParts[1]).get()).data()
    club = club ? { clubId: urlParts[0], ...club } : false
    event = event ? { clubId: urlParts[0], evenId: urlParts[1], ...event } : false
        
    return {
        props: {
            clubid: urlParts[0],
            eventid: urlParts[1],
            club: club,
            event: event
        },
    };
}

export default function UniqueClubEventPage({ clubid, eventid, club, event }) {
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
