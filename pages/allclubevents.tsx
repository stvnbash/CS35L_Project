// @ts-nocheck
import FullCalendar from '../components/Calendar';
import {useContext} from "react";
import {UserContext} from "@/lib/context";

export default function Home() {

    return (
        <div className="w-full p-4 bg-slate-100 rounded-2xl">
            <FullCalendar initialView='dayGridMonth'/>
        </div>
    );
}
