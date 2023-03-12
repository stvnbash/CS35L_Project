// @ts-nocheck
import ClubJoin from "./ClubJoin"
import ClubEdit from "./ClubEdit"
import { UserContext } from "@/lib/context";
import { useContext, useState } from "react";

export default function Component({ clubid, clubname, description }: { clubid: string, clubname: string, description: string }) {
    const { name, email, uid, joinedClubs } = useContext(UserContext);
    const [editMode, setEditMode] = useState(false);
    const [newName, setNewName] = useState(clubname);
    const [newDescription, setNewDescription] = useState(description);

    
    return (
        <div>
            <div className="flex flex-row items-end  px-4">
                {editMode ? <input id="clubname" type="text"
                    className="text-2xl font-bold flex-1 appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-1 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    defaultValue={newName}
                    onChange={() => {setNewName(document.getElementById('clubname').value);}}
                    />
                    : <h1 className="text-2xl font-bold flex-1">{clubname}</h1>}
                <div className="flex gap-4">
                    {email && <ClubEdit editMode={editMode} setEdit={setEditMode} clubid={clubid} newName={newName} newDescription={newDescription} />}
                    {email && (!joinedClubs.includes(clubid)) && <ClubJoin clubid={clubid} joinMode={true} />}
                    {email && (joinedClubs.includes(clubid)) && <ClubJoin clubid={clubid} joinMode={false} />}
                </div>
                {/* <button className="text-lg font-bold px-4 py-2 rounded-xl text-slate-100 bg-gradient-to-r from-emerald-500 to-sky-500">Join Club</button> */}
            </div>
            <div className="mt-4 p-4 bg-slate-100 rounded-2xl">
                <h3 className="text-lg pb-4">More information</h3>
                {editMode ? <textarea id="clubdescription" type="textarea" rows="15"
                    className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-1 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    defaultValue={newDescription} 
                    onChange={() => {setNewDescription(document.getElementById('clubdescription').value);}}
                    />
                    : <p>{description}</p>}
            </div>
        </div>
    )
}
