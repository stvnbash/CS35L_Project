import Calendar from '@fullcalendar/react';
import dayGrid from '@fullcalendar/daygrid';

export default function FullCalendar(props) {
    return <Calendar plugins={[dayGrid]} {...props}
        headerToolbar={{
            start: 'today prev next',
            center: "title",
            end: "dayGridWeek dayGridDay dayGridMonth"
        }}
    />;
}