// @ts-nocheck
import FullCalendar from '../components/Calendar';
import {useContext} from "react";
import {UserContext} from "@/lib/context";

export default function Home() {
    const { joinedClubs } = useContext(UserContext);

    return (
        <div className="w-screen px-80">
            {joinedClubs && <FullCalendar initialView='timeGridWeekShort' joinedClubs={joinedClubs}/>}
        </div>
    );
}