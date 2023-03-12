import ClubCard from "./ClubCard";

export default function Component({ clubs, blockTitle, noClubsMessage }: { clubs: any, blockTitle: string, noClubsMessage: string }) {
    return (
        <div className="mt-4 p-4 bg-slate-100 rounded-2xl">
            <h2 className="text-2xl">{blockTitle}</h2>
            {/* some map function to iterate over myClubs for logged in user */}
            {/* <div className=" w-full p-4"> */}
                {clubs.length === 0 ? <p>{noClubsMessage}</p>
                    : <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 w-full p-4">
                        {clubs.map((club: any) => <ClubCard key={club.id} name={club.name} description={club.description} />)}
                    </div>}
            {/* </div> */}
        </div>
    )
}
