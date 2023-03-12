import ClubCard from "./ClubCard";

export default function Component({ myClubs }: { myClubs: any }) {
    console.log(myClubs)
    return (
        <div className="mt-4 p-4 bg-slate-100 rounded-2xl">
            <h2 className="text-2xl">My Clubs</h2>
            {/* some map function to iterate over myClubs for logged in user */}
            {myClubs.length === 0 ? <p>Immerse yourself in UCLA!  Clubs you join will appear here!</p>
            : <div className="grid grid-cols-3 gap-4 w-full p-4">
                {myClubs.map((myClub: any) => <ClubCard key={myClub.id} name={myClub.name} description={myClub.description} />)}
            </div>}
        </div>
    )
}
