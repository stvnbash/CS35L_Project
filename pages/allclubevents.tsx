// @ts-nocheck
import FullCalendar from '../components/Calendar';
import {useContext} from "react";
import {UserContext} from "@/lib/context";

export default function Home() {

    return (
        <div className="w-full">
            <FullCalendar initialView='timeGridWeekShort'/>
        </div>
    );
}
