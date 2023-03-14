// @ts-nocheck

import { UserContext } from "@/lib/context"
import { useContext, ChangeEvent, useState } from "react"

import { db } from '@/lib/firebase'
import { query, where, getDocs, collection, addDoc, limit } from 'firebase/firestore'
import { useRouter } from 'next/router'


async function inputCheck(clubName, clubDescription, email, clubInstagram, clubWebsite, clubEventColor){
    if (clubName !== ""  && clubDescription !== "") {
        let data;
        const q = query(collection(db, "clubs"), where("name", "==", clubName), limit(1));
        const clubData = await getDocs(q);
        clubData.forEach((doc) => {
            data = doc.data();
        });
        if(data === undefined){
            createClub(db, {clubName}, {clubDescription}, {email}, {clubInstagram}, {clubWebsite}, {clubEventColor})
        }
    }
}

async function createClub(db, {clubName}, {clubDescription}, {email}, {clubInstagram}, {clubWebsite}, {clubEventColor}) {
    await addDoc(collection(db, "clubs"), {
        name: clubName,
        description: clubDescription,
        moderators: [email],
        instagram: clubInstagram,
        website: clubWebsite,
        backgroundColor: clubEventColor
    });
}

export default function CreateClub() {
    const { name, email, uid } = useContext(UserContext)
    const [clubName, setClubName] = useState("");
    const [clubDescription, setClubDescription] = useState("")
    const [clubWebsite, setWebsite] = useState("");
    const [clubInstagram, setInstagram] = useState("")
    const [clubEventColor, setEventColor] = useState("#0000FF");
    const router = useRouter()

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

    const getClubEventColor = (e: ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.value);
        setEventColor(e.target.value);
    };

    return (
        <div>
            <div className="flex flex-row items-end  px-4">
                <h1 className="text-2xl font-bold flex-1">Create a club:</h1>
            </div>
            <div className="mt-4 p-4 bg-slate-100 rounded-2xl">
                <h3 className="text-lg p-4">Enter Club Name</h3>
                <input
                    className="mb-8 appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-1 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    type="text"
                    placeholder="Club Name"
                    onChange={getClubName}
                    value={clubName} />
                <h3 className="text-lg p-4">Enter Club Description</h3>
                <input
                    className="mb-8 appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-1 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    type="text"
                    placeholder="Club Description"
                    onChange={getClubDescription}
                    value={clubDescription} />
                <h3 className="text-lg p-4">Enter Club Website</h3>
                <input
                    className="mb-8 appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-1 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    type="url"
                    placeholder="https://uclaclubhub.com"
                    onChange={getClubWebsite}
                    value={clubWebsite} />
                <h3 className="text-lg p-4">Enter Club Instagram</h3>
                <input
                    className="mb-8 appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-1 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    type="url"
                    placeholder="https://instagram.com/uclaclubhub"
                    onChange={getClubInstagram}
                    value={clubInstagram} />
                <h3 className="text-lg p-4">Enter Club Event Color</h3>
                <input
                    className="mb-8 appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-1 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    type="color"
                    onChange={getClubEventColor}
                    value={clubEventColor} />
                <button
                    className="text-lg font-bold px-4 py-2 rounded-xl text-slate-100 bg-gradient-to-r from-emerald-500 to-sky-500"
                    onClick={() => {router.push(`/`); inputCheck(clubName, clubDescription, email, clubInstagram, clubWebsite, clubEventColor)}}>
                    Create Club
                </button>
            </div>
        </div>
    )
}
