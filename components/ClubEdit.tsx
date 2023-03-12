// @ts-nocheck
import { UserContext } from "@/lib/context"
import { useContext } from "react";
import { useUserData } from "@/lib/context"

import { db } from "@/lib/firebase"
import { arrayUnion, arrayRemove } from "firebase/firestore"
import { firestore } from "@/lib/firebase";

export default function Component({ clubid, editMode, setEdit, newName, newDescription, newWebsite, newInstagram }) {
    const { name, email, uid, joinedClubs } = useContext(UserContext);
    // const userData = useUserData();

    function saveChanges() {
        // this function will save changes to the database for all applicable fields passed in as props

        // console.log(newName, newDescription)
    }

    return (
        <button
            className="text-lg font-bold px-4 ml-4 py-2 rounded-xl text-slate-100 bg-gradient-to-r from-emerald-500 to-sky-500"
            onClick={() => { editMode && saveChanges(); setEdit(!editMode); }}>
            {!editMode ? "Edit Club" : "Save"}
        </button>
    )
}
