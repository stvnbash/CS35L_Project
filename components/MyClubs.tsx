export default function Component() {
    return (
        <div className="mt-4 p-4 bg-slate-100 rounded-2xl">
            <h2 className="text-2xl">My Clubs</h2>
            {/* some map function to iterate over clubs for logged in user */}
            <div className=" w-full p-4">
                <p>Immerse yourself in UCLA!  Clubs you join will appear here!</p>
            </div>
        </div>
    )
}
