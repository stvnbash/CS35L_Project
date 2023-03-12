// @ts-nocheck
import Calendar from '@fullcalendar/react';
import dayGrid from '@fullcalendar/daygrid';
import timeGrid from '@fullcalendar/timegrid'
import { firestore } from "@/lib/firebase";
import React, { useEffect, useState } from "react";


export default function Component({ initialView, joinedClubs }: { initialView: string, joinedClubs: any }) {
    const [events, setEvents] = useState([]);
    const [run, setRun] = useState(false);


    useEffect(() => {
        async function fetchEvents() {
            const events = await fetchData(joinedClubs);
            setRun(true);
            setEvents(events);
        }
        fetchEvents();
    }, [joinedClubs]);


    async function fetchData(joinedClubs) {
        let events = [];
        if (joinedClubs) {
            await Promise.all(joinedClubs.map(async (club) => {
                const snapshot = await firestore.collection('clubs').doc(club).collection('events').get();
                const event = snapshot.docs.map(doc => doc.data());
                console.log("My Club Event", event);
                events = events.concat(event);
            }));
        } else {
            const snapshot = await firestore.collection('clubs').get();
            const clubs = snapshot.docs.map(doc => doc.id);
            await Promise.all(clubs.map(async (club) => {
                const snapshot = await firestore.collection('clubs').doc(club).collection('events').get();
                const event = snapshot.docs.map(doc => doc.data());
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
        ...(event.url && {url: event.url}),
        description: event.description
    }));


    return (
        <Calendar
            plugins={[timeGrid, dayGrid]}
            initialView={initialView}
            events={eventArray}
            headerToolbar={{
                start: 'today prev,next',
                center: 'title',
                end: 'dayGridDay,dayGridMonth,timeGridWeekShort'
            }}
            views={{
                timeGridWeekShort: {
                    type: 'timeGridWeek',
                    slotMinTime: '06:00:00',
                    slotMaxTime: '22:00:00'
                }
            }}
            nowIndicator={true}
        />
    );
}