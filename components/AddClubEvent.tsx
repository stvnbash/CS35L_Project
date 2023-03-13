// react imports
import { useContext } from "react";

// user-defined hooks
import { UserContext } from "@/lib/context";

// firestore imoprts
import { firestore } from "@/lib/firebase"
import { doc, updateDoc } from "firebase/firestore";

// router imports
import { useRouter } from "next/router"


export default function AddClubEvent({ clubId, clubName }: { clubId: string, clubName: string }) {
    // consume context from _app
    const { email } = useContext(UserContext);
    // initialize dynamic router
    const router = useRouter();
    
    const handleEventSubmit = async (eventIn: any) => {
        eventIn.preventDefault();
        const form = eventIn.target;
        const formData = new FormData(form);

        // get event fields
        const start = formData.get("start");
        const end = formData.get("end");
        const title = formData.get("title");
        const description = formData.get("description");

        // create new event
        const newEvent = {
            start: start,
            end: end,
            title: title,
            description: description
        };

        // fetch doc id from firestore with format:
        // clubs(collection) > events(collection) > event(document)
        const docId = (await firestore.collection("clubs").doc(clubId).collection("events").add(newEvent)).id;
        // assign url
        const url = "/club/events/" + clubId + "_" + docId;
        // update firebase
        await updateDoc(doc(firestore, "clubs", clubId, "events", docId), {
            url: url
        });
    };

    return (
        <div>
            <div className="flex flex-row items-end  px-4">
                <h1 className="text-2xl font-bold flex-1">Create an event for {clubName}:</h1>
            </div>
            <div className="mt-4 p-4 bg-slate-100 rounded-2xl">
                {email &&
                    <form onSubmit={handleEventSubmit}>
                        <div className="flex flex-col">
                            <h3 className="text-lg p-4">Title</h3>
                            <input className="mb-8 appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-1 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                type="text" name="title" />
                            <div className="flex flex-row gap-4">
                                <h3 className="text-lg p-4">Start Time</h3>
                                <input className="mb-8 appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-1 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    type="datetime-local" name="start" />
                                <h3 className="text-lg p-4">End Time</h3>
                                <input className="mb-8 appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-1 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    type="datetime-local" name="end" />
                            </div>
                            <h3 className="text-lg p-4">Description</h3>
                            <textarea className="mb-8 appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-1 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                name="description"></textarea>
                        </div>
                        <button type="submit" onClick={() => router.push(`/club/${clubId}`)} className="text-lg font-bold px-4 py-2 rounded-xl text-slate-100 bg-gradient-to-r from-emerald-500 to-sky-500">Add Event</button>
                    </form>
                }
            </div>
        </div>
    );
}
