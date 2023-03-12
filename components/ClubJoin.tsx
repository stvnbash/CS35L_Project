// @ts-nocheck
import { UserContext } from "@/lib/context"
import { useContext } from "react";
import { useUserData } from "@/lib/context"

import {db} from "@/lib/firebase"
import {arrayUnion} from "firebase/firestore"
import { firestore } from "@/lib/firebase";


// async function joinClub(db, {clubName}) {
//     await setDoc(db, "users", "email"), {
//         clubs: 
//     }
    
// }

export default function Component({clubid}:{clubid:string})
{
    const { name, email, uid, joinedClubs } = useContext(UserContext);
    // const userData = useUserData();

    function handleButtonClick()
    {
        // reference to user
        let colRef = firestore.collection("users").doc(email);
        // update user's joined clubs array
        colRef.update({
            clubs: arrayUnion(clubid)
          });
        console.log("joined");
    }
    return(
        <button 
        className="text-lg font-bold px-4 py-2 rounded-xl text-slate-100 bg-gradient-to-r from-emerald-500 to-sky-500"
        onClick={handleButtonClick}>
            Join Club
        </button>
    )
}