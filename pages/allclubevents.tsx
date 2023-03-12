// @ts-nocheck
import FullCalendar from '../components/Calendar';
import {useContext} from "react";
import {UserContext} from "@/lib/context";

export default function Home() {
    const { email } = useContext(UserContext);

    return (
        <div className="w-screen px-80">
            <FullCalendar initialView='timeGridWeekShort' email={email}/>
        </div>
    );
}
