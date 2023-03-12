// @ts-nocheck
import { UserContext } from "@/lib/context"
import { useContext } from "react";
import { useUserData } from "@/lib/context"

import { db } from "@/lib/firebase"
import { arrayUnion, arrayRemove } from "firebase/firestore"
import { firestore } from "@/lib/firebase";

export default function Component({ clubid, editMode, setEdit, newName, newDescription }) {
    const { name, email, uid, joinedClubs } = useContext(UserContext);
    // const userData = useUserData();

    function editClub() {
        // // reference to user
        // let colRef = firestore.collection("users").doc(email);
        // // update user's joined clubs array
        // colRef.update({
        //     clubs: arrayUnion(clubid)
        //   });
        // // console.log("joined");
    }

    function saveChanges() {
        // // reference to user
        // let colRef = firestore.collection("users").doc(email);
        // // update user's joined clubs array
        // colRef.update({
        //     clubs: arrayUnion(clubid)
        //   });
        // console.log("joined");
        console.log(newName, newDescription)
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
            onClick={() => {editMode && saveChanges(); setEdit(!editMode); }}>
            {!editMode ? "Edit Club" : "Save"}
        </button>
    )
}