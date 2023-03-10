// @ts-nocheck

import ClubCard from './ClubCard'
import { db, firestore, getClub, toJSON } from '../lib/firebase';
import { collection, doc, query, getDocs, orderBy } from 'firebase/firestore';

export default function Component({ clubs }) {
    return (
        <div className="mt-4 p-4 bg-slate-100 rounded-2xl">
            <h2 className="text-2xl">All Clubs</h2>
            {/* some map function to iterate over clubs for logged in user */}
            <div className=" w-full p-4">
                {clubs.length === 0 && <p>No Clubs exist at UCLA</p>}
                <div className='grid grid-cols-3 gap-4'>
                    {clubs.map((club) => <ClubCard key={club.name} name={club.name} description={club.description} /> )}
                </div>
            </div>
        </div>
    )
}