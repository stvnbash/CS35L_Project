// @ts-nocheck

import ClubCard from "./ClubCard"

export default function Component({ clubs, blockTitle, noClubsMessage, search }: { clubs: any, blockTitle: string, noClubsMessage: string, search?: string }) {
    let c = []
    for (let club of clubs) {
        console.log(club.name)
        if (search === '' || club.name?.toLowerCase().includes(search) || club.description?.toLowerCase().includes(search)) {
            c.push(club)
        }
    }


    return (
        <div className="mt-4 p-4 bg-slate-100 rounded-2xl">
            <h2 className="text-2xl">{blockTitle}</h2>
            {c.length === 0 ? <p>{search === '' ? noClubsMessage : "No clubs match your search"}</p>
                : <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 w-full p-4">
                    {c.map((c: any) => <ClubCard key={c.id} clubid={c.id} name={c.name} description={c.description} />)}
                </div>}
        </div>
    )
}
