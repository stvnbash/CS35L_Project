// @ts-nocheck
import { UserContext } from "@/lib/context"
import { useContext } from "react";
import { useUserData } from "@/lib/context"

import { db } from "@/lib/firebase"
import { arrayUnion, arrayRemove } from "firebase/firestore"
import { firestore } from "@/lib/firebase";

export default function Component({ clubid, joinMode }: { clubid: string, joinMode: boolean }) {
    const { name, email, uid, joinedClubs } = useContext(UserContext);
    // const userData = useUserData();

    function joinClub() {
        // reference to user
        let colRef = firestore.collection("users").doc(email);
        // update user's joined clubs array
        colRef.update({
            clubs: arrayUnion(clubid)
        });
        // console.log("joined");
    }

    function leaveClub() {
        // reference to user
        let colRef = firestore.collection("users").doc(email);
        // update user's joined clubs array
        colRef.update({
            clubs: arrayRemove(clubid)
        });
        // console.log("removed");
    }

    return (
        <button
            className="text-lg font-bold px-4 py-2 rounded-xl text-slate-100 bg-gradient-to-r from-emerald-500 to-sky-500"
            onClick={joinMode ? joinClub : leaveClub}>
            {joinMode ? "Join" : "Leave"} Club
        </button>
    )
}
