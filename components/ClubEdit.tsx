// @ts-nocheck
import { UserContext } from "@/lib/context"
import { useContext } from "react";

import { db } from "@/lib/firebase"
import { updateDoc, doc } from "firebase/firestore"

async function editClub(newClubDescription, newClubName, id, newClubWebsite, newClubInstagram){  
    await updateDoc(doc(db, "clubs", id), {
      name: newClubName,
      description: newClubDescription,
      website: newClubWebsite,
      instagram: newClubInstagram
    });
}

export default function Component({ clubid, editMode, setEdit, newName, newDescription, newWebsite, newInstagram }) {
    const { name, email, uid, joinedClubs } = useContext(UserContext);

    return (
        <button
            className="text-lg font-bold px-4 ml-4 py-2 rounded-xl text-slate-100 bg-gradient-to-r from-emerald-500 to-sky-500"
            onClick={() => { editMode && editClub(newDescription, newName, clubid, newWebsite, newInstagram); setEdit(!editMode); }}>
            {!editMode ? "Edit Club" : "Save"}
        </button>
    )
}
