import { firestore } from '@/lib/firebase'
import { useState } from "react";

function DeleteEvent({ clubId, eventId }: { clubId: string, eventId: string}) {
    const[isDeleting, setIsDeleting] = useState(false);

    async function handleDelete() {
        setIsDeleting(true);

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

export default function Component({ clubEvent, club }: { clubEvent: any, club: string}) {
    return (
        <div>
            <div className="flex flex-row items-end  px-4">
                <h1 className="text-2xl font-bold flex-1">{clubEvent.title}</h1>
                <DeleteEvent eventId={clubEvent} clubId={club}/>
            </div>
            <div className="mt-4 p-4 bg-slate-100 rounded-2xl">
                <h3 className="text-lg pb-4">Description</h3>
                <p>{clubEvent.description}</p>
                <h3 className="test-lg pb-4">Start Time</h3>
                <p>{clubEvent.start}</p>
                <h3 className="test-lg pb-4">End Time</h3>
                <p>{clubEvent.end}</p>
            </div>
        </div>
    )
}