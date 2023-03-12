// // @ts-nocheck
// import { UserContext } from '@/lib/context'
// import { useContext } from 'react'
// import { ChangeEvent, useState } from "react";

// import { db } from '@/lib/firebase'
// import { doc, setDoc } from 'firebase/firestore'
// import { query, where, getDoc, getDocs } from 'firebase/firestore'
// import { collection, addDoc } from 'firebase/firestore'

// function inputCheck(clubName, clubDescription, email){
//     console.log(email)
//     if (clubName === ""  && clubDescription === "") {
//         console.log("le")
//     } else {
//         console.log("me");
//         createClub(db, {clubName}, {clubDescription})
//     }
// }

// async function editCheck(clubName, clubDescription){
//     console.log("here")
//     const q = query(collection(db, "clubs"), where("name", "==", clubName));

//     const clubData = await getDocs(q);
    
//     clubData.forEach((doc) => {
//         console.log(doc.id);
//         console.log(doc.data())
//     });

// }

// async function editClub(db, {clubName}, {clubDescription}) {
//     await setDoc(doc(db, "clubs", "p"), {
//         name: clubName,
//         description: clubDescription
//       });
// }
// async function createClub(db, {clubName}, {clubDescription}) {
//     await addDoc(collection(db, "clubs"), {
//         name: clubName,
//         description: clubDescription
//     });
// }

// export default function hate() {
//   const [clubName, setClubName] = useState("");
//   const [clubDescription, setClubDescription] = useState("")
//   const { name, email, uid } = useContext(UserContext);

//   const getClubName = (e: ChangeEvent<HTMLInputElement>) => {
//     //Store the input value to local state
//     setClubName(e.target.value);
//   }
//   const getClubDescription = (e: ChangeEvent<HTMLInputElement>) => {
//     //Store the input value to local state
//     setClubDescription(e.target.value);
//   };

//   return (
//     <div>
//       <input type="text" onChange={getClubName} value={clubName} />
//       <p>Input: {clubName}</p>

//       <input type="text" onChange={getClubDescription} value={clubDescription} />
//       <p>Input: {clubDescription}</p>
//       <button onClick={() => inputCheck(clubName, clubDescription, email)}>Create Club</button>
//       <button onClick={() => editCheck(clubName, clubDescription)}>Edit Club</button>
//     </div>
//   );
// };

// @ts-nocheck

import { firestore } from "@/lib/firebase";
import { useRouter } from 'next/router';
import ClubPage from 'components/ClubPage';
import ClubJoin from 'components/ClubJoin';
import CreateClub from "@/components/CreateClub";

export default function Page({}) {
    return (
        <CreateClub />
    )

}
