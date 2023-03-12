// @ts-nocheck
import Calendar from '@fullcalendar/react';
import dayGrid from '@fullcalendar/daygrid';
import timeGrid from '@fullcalendar/timegrid'
import { firestore } from "@/lib/firebase";
import React, { Component} from "react";
import {getDoc} from "firebase/firestore";


class FullCalendar extends Component {
    constructor(props: string) {
        super(props);
        this.state = {
            initialView: props.initialView,
            email: props.email,
            events: [],
            docData: null,
        };
    }


    async componentDidMount() {
        const userClubsRef = firestore.collection('users').doc(this.state.email);
        const doc = await getDoc(userClubsRef);
        const docData = doc.data();

        docData.clubs.forEach((club) => {
            firestore.collection('clubs').doc(club).collection('events').get().then(snapshot => {
                const events = snapshot.docs.map(doc => doc.data());
                this.setState( { events: this.state.events.concat(events)} )
            })
        });
        // for (club of docData.clubs) {
        //     console.log(club);
        //     firestore.collection('clubs').doc(club).collection('events').get().then(snapshot => {
        //         const event = snapshot.docs.map(doc => doc.data());
        //         this.state.events.append(event);
        //     })
        // }
        // firestore.collection('events').get().then(snapshot => {
        //     const events = snapshot.docs.map(doc => doc.data());
        //     this.setState({events});
        // });
    }


    render() {

        const eventArray = this.state.events.map(event => ({
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
                plugins={[ timeGrid, dayGrid ]}
                initialView={this.state.initialView}
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
}
export default FullCalendar;