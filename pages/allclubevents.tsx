import FullCalendar from '../components/Calendar';

export default function Home() {
  return (
    <div className="w-screen px-80">
      <FullCalendar initialView='timeGridWeekShort' />
    </div>
  );
}
