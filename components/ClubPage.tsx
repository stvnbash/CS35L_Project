// @ts-nocheck
import ClubJoin from "./ClubJoin"
import { UserContext } from "@/lib/context";
import { useContext } from "react";

export default function Component({ clubid, clubname, description }: { clubid: string, clubname: string, description: string }) {
    const { name, email, uid, joinedClubs } = useContext(UserContext);
    return (
        <div>
            <div className="flex flex-row items-end  px-4">
                <h1 className="text-2xl font-bold flex-1">{clubname}</h1>
                {email && (!joinedClubs.includes(clubid)) && <ClubJoin clubid={clubid} />}
                {/* <button className="text-lg font-bold px-4 py-2 rounded-xl text-slate-100 bg-gradient-to-r from-emerald-500 to-sky-500">Join Club</button> */}
            </div>
            <div className="mt-4 p-4 bg-slate-100 rounded-2xl">
                <h3 className="text-lg pb-4">More information</h3>
                <p>{description}</p>
            </div>
        </div>
    )
}
