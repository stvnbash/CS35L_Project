// @ts-nocheck

// calendar imports
import Calendar from "@fullcalendar/react";
import dayGrid from "@fullcalendar/daygrid";
import timeGrid from "@fullcalendar/timegrid";

// firestore imports
import { firestore } from "@/lib/firebase";

// react imports
import React, { useEffect, useState } from "react";


export default function Component({ initialView, joinedClubs, setEventsList, setCalRun }: { initialView: string, joinedClubs: any }) {
    const [events, setEvents] = useState([]);
    const [run, setRun] = useState(false);


    useEffect(() => {
        async function fetchEvents() {
            const eventsUE = await fetchData(joinedClubs);
            // local state in this component
            setRun(true);
            setEvents(eventsUE);
            // this state is for ClubPage and is passed in as a prop
            setCalRun && setCalRun(run)
        }
        fetchEvents();
    }, [joinedClubs]);


    async function fetchData(joinedClubs) {
        let events = [];
        if (joinedClubs) {
            await Promise.all(joinedClubs.map(async (club) => {
                const snapshot = await firestore.collection("clubs").doc(club).collection("events").get();
                const clubDoc = (await firestore.collection("clubs").doc(club).get()).data();
                const event = snapshot.docs.map(doc => doc.data());
                for (let e of event) {
                    console.log("E   ", e);
                    e["backgroundColor"] = clubDoc.backgroundColor;
                }
                events = events.concat(event);
            }));
        } else {
            const snapshot = await firestore.collection("clubs").get();
            const clubs = snapshot.docs.map(doc => doc.id);
            await Promise.all(clubs.map(async (club) => {
                const snapshot = await firestore.collection("clubs").doc(club).collection("events").get();
                const clubDoc = (await firestore.collection("clubs").doc(club).get()).data();
                const event = snapshot.docs.map(doc => doc.data());
                for (let e of event) {
                    console.log("E   ", e);
                    e["backgroundColor"] = clubDoc.backgroundColor;
                }
                events = events.concat(event);
            }));
        }
        return events;
    }


    const eventArray = events.map(event => ({
        title: event.title,
        start: new Date(event.start),
        end: new Date(event.end),
        allDay: event.allDay,
        backgroundColor: event.backgroundColor,
        display: event.display,
        textColor: event.textColor,
        ...(event.url && { url: event.url }),
        description: event.description
    }));


    return (
        <Calendar
            plugins={[timeGrid, dayGrid]}
            initialView={initialView}
            events={eventArray}
            headerToolbar={{
                start: "today prev,next",
                center: "title",
                end: "dayGridDay,dayGridMonth,timeGridWeekShort"
            }}
            views={{
                timeGridWeekShort: {
                    type: "timeGridWeek",
                    slotMinTime: "08:00:00",
                    slotMaxTime: "22:00:00"
                }
            }}
            nowIndicator={true}
        />
    );
}
