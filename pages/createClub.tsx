// @ts-nocheck
import { UserContext } from '@/lib/context'
import { useContext } from 'react'
import { ChangeEvent, useState } from "react";

import { db } from '@/lib/firebase'
import { doc, setDoc } from 'firebase/firestore'
import { collection, addDoc } from 'firebase/firestore'

function inputCheck(clubName, clubDescription){
    if (clubName === ""  && clubDescription === "") {
        console.log("le")
    } else {
        console.log("me");
        createClub(db, {clubName}, {clubDescription})
    }
}

function editCheck(clubName, clubDescription){
    
}

async function editClub(db, {clubName}, {clubDescription}) {
    await setDoc(doc(db, "clubs", "p"), {
        name: clubName,
        description: clubDescription
      });
}
async function createClub(db, {clubName}, {clubDescription}) {
    await addDoc(collection(db, "clubs"), {
        name: clubName,
        description: clubDescription
    });
}

export default function hate() {
  const [clubName, setClubName] = useState("");
  const [clubDescription, setClubDescription] = useState("")

  const getClubName = (e: ChangeEvent<HTMLInputElement>) => {
    //Store the input value to local state
    setClubName(e.target.value);
  }
  const getClubDescription = (e: ChangeEvent<HTMLInputElement>) => {
    //Store the input value to local state
    setClubDescription(e.target.value);
  };

  return (
    <div>
      <input type="text" onChange={getClubName} value={clubName} />

      {/*Use the input value from state */}
      <p>Your input: {clubName}</p>
      <input type="text" onChange={getClubDescription} value={clubDescription} />

      {/*Use the input value from state */}
      <p>Your input: {clubDescription}</p>

      <button onClick={() => inputCheck(clubName, clubDescription)}>Create Club</button>
      <button onClick={() => editClub(db, {clubName}, {clubDescription})}>Edit Club</button>
    </div>
  );
};