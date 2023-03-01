import ClubCard from './ClubCard'

export default function Component() {
    return (
        <div className="mt-4 p-4 bg-slate-100 rounded-2xl">
            <h2 className="text-2xl">All Clubs</h2>
            {/* some map function to iterate over clubs for logged in user */}
            <div className=" w-full p-4">
                <p>No Clubs exist at UCLA</p>
                <ClubCard name="Sample club" description="sample description" />
            </div>
        </div>
    )
}
