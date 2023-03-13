// @ts-nocheck
import { firestore } from '@/lib/firebase'
import {useEffect, useState} from "react";

function DeleteEvent({ clubId, eventId }: { clubId: string, eventId: string}) {
    const[isDeleting, setIsDeleting] = useState(false);

    async function handleDelete() {
        setIsDeleting(true);
        console.log("IN FUN");
        console.log("CLUB ID DELETE", clubId)
        console.log("EVENT ID DELETE", eventId)


        try {
            await firestore.collection('clubs').doc(clubId).collection('events').doc(eventId).delete();
        } catch (error) {
            console.error('Error deleting document: ', error);
        }

        setIsDeleting(false);
    }

    return (
        <button
            className="text-lg font-bold px-4 py-2 rounded-xl text-slate-100 bg-gradient-to-r from-emerald-500 to-sky-500"
            onClick={handleDelete} disabled={isDeleting}>
            Delete Event
        </button>
    );
}

export default function Component({ clubEvent, event, club }: { clubEvent: any, event: string, club: string}) {
    const start = new Date(clubEvent.start);
    const end = new Date(clubEvent.end);
    const[formattedStart, setFormattedStart] = useState();
    const[formattedEnd, setFormattedEnd] = useState();

    const options = {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        hour12: true,
    };

    useEffect(() => {
        setFormattedStart(start.toLocaleString('en-US', options));
        setFormattedEnd(end.toLocaleString('en-US', options));
    }, []);

    return (
        <div>
            <div className="flex flex-row items-end  px-4">
                <h1 className="text-2xl font-bold flex-1">{clubEvent.title}</h1>
                <DeleteEvent eventId={event} clubId={club}/>
            </div>
            <div className="mt-4 p-4 bg-slate-100 rounded-2xl">
                <h3 className="text-lg pb-4">Description</h3>
                <p>{clubEvent.description}</p>
                <br/>
                <div style={{ display: 'inline-block'}}>
                    <h3 className="test-lg pb-4">Start Time</h3>
                    <p>{formattedStart}</p>
                </div>
                <div style={{ display: 'inline-block', marginLeft: '20px'}}>
                    <h3 className="test-lg pb-4">End Time</h3>
                    <p>{formattedEnd}</p>
                </div>
            </div>
        </div>
    )
}