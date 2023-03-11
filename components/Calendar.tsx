import Calendar from '@fullcalendar/react';
import dayGrid from '@fullcalendar/daygrid';
import timeGrid from '@fullcalendar/timegrid'
import { firestore } from "@/lib/firebase";
import React, {Component} from "react";


class FullCalendar extends Component {
    constructor(props: string) {
        super(props);
        this.state = {
            events: []
        };
    }


    componentDidMount() {
        firestore.collection('events').get().then(snapshot => {
            const events = snapshot.docs.map(doc => doc.data());
            this.setState({ events });
        });
    }


    render() {
        const eventArray = this.state.events.map(event => ({
            title: event.title,
            start: new Date(event.start),
            end: new Date(event.end),
            allDay: event.allDay,
            color: event.color,
            display: event.display,
            textColor: event.textColor,
            url: event.url
        }));

        return (
            <Calendar
                plugins={[ timeGrid, dayGrid ]}
                {...this.props}
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