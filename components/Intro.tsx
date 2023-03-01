import { useSession, signIn, signOut } from "next-auth/react"

export default function Component() {

    const { data: session, status } = useSession()
    
    return (
        <div>
            {<h1 className="text-1xl sm:text-2xl lg:text-4xl font-bold">WELCOME{(status !== "loading" && session) ? `, ${session.user?.name?.toUpperCase() as string}, ` : ``} TO THE</h1>}
            <h1 className="text-5xl sm:text-6xl lg:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-sky-500 hover:from-emerald-500 hover:to-sky-500 ease-in-out transition-all">UCLA ClubHUB</h1>
        </div>
    )
}
