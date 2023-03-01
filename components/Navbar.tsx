import Link from 'next/link'
import { useSession, signIn, signOut } from "next-auth/react"

export default function Component() {

    const { data: session, status } = useSession()

    return (
        <div className='bg-slate-900 text-white p-3'>
        <div className="flex flex-row justify-between items-center max-w-6xl lg:max-w-7xl xl:max-w-8xl mx-auto">
            <Link href='/' className="p-2 text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-sky-300">UCLA ClubHUB</Link>
            <div className='flex flex-col items-center text-sm'>
                        {status !== "loading" && session && <p className='' title={session.user?.email as string}>{`Welcome, ${session.user?.name}`}</p>}
                        {status !== "loading" && !session && <button className='hover:bg-uclablue hover:text-white ml-1 px-3 py-1 rounded-md font-medium transition' onClick={() => signIn('google')}>Sign In</button>}
                        {status !== "loading" && session && <button className='hover:bg-uclablue hover:text-white ml-1 px-3 py-1 rounded-md font-medium transition' onClick={() => signOut({ redirect: false, })}>Sign Out</button>}
                    </div>
        </div></div>
    )
}
