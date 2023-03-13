// @ts-nocheck
import { UserContext } from '@/lib/context'
import { useContext } from 'react'
import { ChangeEvent, useState } from "react";

import { db } from '@/lib/firebase'
import { doc, setDoc } from 'firebase/firestore'
import { query, where, getDoc, getDocs } from 'firebase/firestore'
import { collection, addDoc, updateDoc, limit } from 'firebase/firestore'

async function inputCheck(clubName, clubDescription, email, clubInstagram, clubWebsite){
    console.log(email)
    console.log(clubInstagram)
    console.log(clubWebsite)
    if (clubName !== ""  && clubDescription !== "") {
        let data;
        const q = query(collection(db, "clubs"), where("name", "==", clubName), limit(1));
        const clubData = await getDocs(q);
        clubData.forEach((doc) => {
            data = doc.data();
        });
        console.log(data)
        if(data === undefined){
            console.log("ef")
            createClub(db, {clubName}, {clubDescription}, {email}, {clubInstagram}, {clubWebsite})
        } else {
            console.log("fe")
        }
        
    }
}

async function editCheck(clubName, newClubDescription, newClubName, email){
    console.log(email)
    const q = query(collection(db, "clubs"), where("name", "==", clubName));
 
    const clubData = await getDocs(q);
    let id;
    let data;
    clubData.forEach((doc) => {
        id = doc.id;
        data = doc.data();
    });
    console.log(data)
    if(newClubDescription === ""){
        newClubDescription = data.description
    }
    
    await updateDoc(doc(db, "clubs", id), {
      name: newClubName,
      description: newClubDescription
    });
}

async function createClub(db, {clubName}, {clubDescription}, {email}, {clubInstagram}, {clubWebsite}) {
    //let clubId = clubName.replace(/\s+/g, "")
    await addDoc(collection(db, "clubs"), {
        name: clubName,
        description: clubDescription,
        moderators: [email],
        instagram: clubInstagram,
        website: clubWebsite
    });
}

export default function hate() {
  const [clubName, setClubName] = useState("");
  const [clubDescription, setClubDescription] = useState("")
  const [clubWebsite, setWebsite] = useState("");
  const [clubInstagram, setInstagram] = useState("")
  const [newClubName, setNewClubName] = useState("");
  const [newClubDescription, setNewClubDescription] = useState("")
  const { name, email, uid } = useContext(UserContext);

  const getClubName = (e: ChangeEvent<HTMLInputElement>) => {
    //Store the input value to local state
    setClubName(e.target.value);
  }
  const getClubDescription = (e: ChangeEvent<HTMLInputElement>) => {
    //Store the input value to local state
    setClubDescription(e.target.value);
  };
  const getClubWebsite = (e: ChangeEvent<HTMLInputElement>) => {
    //Store the input value to local state
    setWebsite(e.target.value);
  };
  const getClubInstagram = (e: ChangeEvent<HTMLInputElement>) => {
    //Store the input value to local state
    setInstagram(e.target.value);
  };
  const getNewClubName = (e: ChangeEvent<HTMLInputElement>) => {
    //Store the input value to local state
    setNewClubName(e.target.value);
  }
  const getNewClubDescription = (e: ChangeEvent<HTMLInputElement>) => {
    //Store the input value to local state
    setNewClubDescription(e.target.value);
  };

  return (
    <div>
      <input type="text" onChange={getClubName} value={clubName} />
      <p>Input: {clubName}</p>

      <input type="text" onChange={getClubDescription} value={clubDescription} />
      <p>Input: {clubDescription}</p>

      <input type="text" onChange={getClubWebsite} value={clubWebsite} />
      <p>Input: {clubWebsite}</p>

      <input type="text" onChange={getClubInstagram} value={clubInstagram} />
      <p>Input: {clubInstagram}</p>

      <input type="text" onChange={getNewClubName} value={newClubName} />
      <p>Input: {newClubName}</p>

      <input type="text" onChange={getNewClubDescription} value={newClubDescription} />
      <p>Input: {newClubDescription}</p>

      <button onClick={() => inputCheck(clubName, clubDescription, email, clubInstagram, clubWebsite)}>Create Club</button>
      <button onClick={() => editCheck(clubName, newClubName, newClubDescription, email)}>Edit Club</button>
    </div>
  );
};