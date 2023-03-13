// @ts-nocheck
import ClubJoin from "./ClubJoin"
import ClubEdit from "./ClubEdit"
import { UserContext } from "@/lib/context";
import { useContext, useEffect, useState } from "react";
import Link from 'next/link'
import FullCalendar from '../components/Calendar';

export default function Component({ clubid, clubname, description, website, instagram, moderators }: { clubid: string, clubname: string, description: string, website: string, instagram: string }) {
    const { name, email, uid, joinedClubs } = useContext(UserContext);
    const [editMode, setEditMode] = useState(false);
    const [newName, setNewName] = useState(clubname);
    const [newDescription, setNewDescription] = useState(description);
    const [newWebsite, setNewWebsite] = useState(website);
    const [newInstagram, setNewInstagram] = useState(instagram);
    const [calRun, setCalRun] = useState(false);
    const [eventsList, setEventsList] = useState(false);
    // console.log("mod", moderators)


    return (
        <div>
            <div className="flex flex-row items-end  px-4">
                {editMode ? <input id="clubname" type="text"
                    className="text-2xl font-bold flex-1 appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-1 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    defaultValue={newName}
                    placeholder="Club Name"
                    onChange={() => { setNewName(document.getElementById('clubname').value); }}
                />
                    : <h1 className="text-2xl font-bold flex-1">{newName}</h1>}
                <div className="flex gap-4">
                    {/* button to edit and save changes, displays if moderator */}
                    {email && (moderators && moderators.includes(email)) && <ClubEdit editMode={editMode}
                        setEdit={setEditMode}
                        clubid={clubid}
                        newName={newName}
                        newDescription={newDescription}
                        newWebsite={newWebsite}
                        newInstagram={newInstagram}
                    />}
                    {/* Button to join or leave club, displays when not in editMode */}
                    {!editMode && email && (!joinedClubs.includes(clubid)) && <ClubJoin clubid={clubid} joinMode={true} />}
                    {!editMode && email && (joinedClubs.includes(clubid)) && <ClubJoin clubid={clubid} joinMode={false} />}
                    {/* button to add event, displays in editMode */}
                    {editMode && <Link href={`/club/addevent/${clubid}`} className="text-lg font-bold px-4 ml-4 py-2 rounded-xl text-slate-100 bg-gradient-to-r from-emerald-500 to-sky-500">Add Event</Link>}
                </div>
                {/* <button className="text-lg font-bold px-4 py-2 rounded-xl text-slate-100 bg-gradient-to-r from-emerald-500 to-sky-500">Join Club</button> */}
                {/* <Link style={{marginLeft: '20px'}}
                    className="text-lg font-bold px-4 py-2 rounded-xl text-slate-100 bg-gradient-to-r from-emerald-500 to-sky-500"
                    href={"/club/addevent/"+clubid}>
                    Add Event
                </Link> */}
            </div>
            <div className="mt-4 p-4 bg-slate-100 rounded-2xl">
                <h3 className="text-lg pb-4">More information</h3>
                {editMode ? <textarea id="clubdescription" type="textarea" rows="15"
                    className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-1 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    defaultValue={newDescription}
                    placeholder="Club description"
                    onChange={() => { setNewDescription(document.getElementById('clubdescription').value); }}
                />
                    : <p>{newDescription}</p>}
            </div>
            {(newWebsite || newInstagram || editMode) && <div className="mt-4 p-4 bg-slate-100 rounded-2xl">
                {/* <h3 className="text-lg pb-4">Links</h3> */}
                <div className="flex flex-col gap-4">
                    {editMode ? <input id="website" type="text" rows="15"
                        className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-1 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        defaultValue={newWebsite}
                        placeholder="https://myclub.com"
                        onChange={() => { setNewWebsite(document.getElementById('website').value); }}
                    />
                        : newWebsite && <Link href={newWebsite ? newWebsite : '#'}>Website: {newWebsite}</Link>}
                    {editMode ? <input id="instagram" type="text" rows="10"
                        className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-1 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        defaultValue={newInstagram}
                        placeholder="https://instagram.com"
                        onChange={() => { setNewInstagram(document.getElementById('instagram').value); }}
                    />
                        : newInstagram && <Link href={newInstagram ? newInstagram : '#'}>Instagram: {newInstagram}</Link>}
                </div>
            </div>}
            {console.log("EL", calRun)}
            {<div className="mt-4 p-4 bg-slate-100 rounded-2xl">
                <h3 className="text-lg pb-4 flex-1">Events</h3>
                <div className="w-full">
                    {<FullCalendar initialView='dayGridMonth' joinedClubs={[clubid]} setEventsList={setEventsList} setCalRun={setCalRun} />}
                </div>
            </div>}
        </div>
    )
}
