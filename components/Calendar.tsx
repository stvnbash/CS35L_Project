import Calendar from '@fullcalendar/react';
import dayGrid from '@fullcalendar/daygrid';
import timeGrid from '@fullcalendar/timegrid'



export default function FullCalendar(props) {
    return <Calendar plugins={[dayGrid, timeGrid]} {...props}
        headerToolbar={{
            start: 'today prev next',
            center: "title",
            end: "dayGridDay dayGridMonth timeGridWeekShort"
        }}
        events={[
            { // this object will be "parsed" into an Event Object
              title: 'ACM Hack', // a property!
              allDay: false,
              start: '2023-03-10T13:30:00-08:00', // a property!
              end: '2023-03-10T15:30:00-08:00'
            }
        ]}
        views={{
            timeGridWeekShort: {
                type: 'timeGridWeek',
                slotMinTime: '06:00:00',
                slotMaxTime: '22:00:00'
            }
        }}
    />;
}