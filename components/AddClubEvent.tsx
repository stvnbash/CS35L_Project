import { firestore } from '@/lib/firebase'
import {useState} from 'react';
import { UserContext } from '@/lib/context';
import { useContext } from 'react';
import { updateDoc } from '@firebase/firestore';
import { doc}  from 'firebase/firestore';


export default function AddClubEvent({ clubId, clubName }: {clubId: string, clubName: string}) {
    const { email } = useContext(UserContext);

    const handleEventSubmit = async (eventIn: any) => {
        eventIn.preventDefault();
        const form = eventIn.target;
        const formData = new FormData(form);

        const start = formData.get("start");
        const end = formData.get("end");
        const title = formData.get("title");
        const description = formData.get("description");

        const newEvent = {
            start: start,
            end: end,
            title: title,
            description: description
        };

        const docId = (await firestore.collection('clubs').doc(clubId).collection('events').add(newEvent)).id;
        const url = '/club/events/'+clubId+'_'+docId;
        await updateDoc(doc(firestore, 'clubs', clubId, 'events', docId), {
            url: url
        });
    };

    return (
        <div>
            {email &&
            <form onSubmit={handleEventSubmit}>
                <input type="datetime-local" name="start" />
                <input type="datetime-local" name="end" />
                <input type="text" name="title" />
                <textarea name="description"></textarea>
                <button type="submit">Add Event</button>
            </form>
            }
        </div>
    );
}