import Calendar from '@fullcalendar/react';
import dayGrid from '@fullcalendar/daygrid';
// import timeGrid from '@fullcalendar/timegrid';

export default function FullCalendar(props) {
  return <Calendar plugins={[dayGrid]} {...props} 
  />;
}