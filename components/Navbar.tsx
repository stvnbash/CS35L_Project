import Link from 'next/link'
import { auth, provider } from '../lib/firebase'
import { useContext } from 'react';
import { UserContext } from '../lib/context';

export default function Component() {
    // get context from _app
    const { name, email, uid } = useContext(UserContext);

    return (
        <div className='bg-slate-900 text-white p-3'>
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-center max-w-6xl lg:max-w-7xl xl:max-w-8xl mx-auto">
                <Link href='/' className="p-2 text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-sky-300">Club<span className="ml-1 px-1 py-0 rounded-sm bg-gradient-to-r to-emerald-300 from-sky-300 text-slate-900">hub</span></Link>
                <div className='flex gap-4'>
                    <Link href='/'>Home</Link>
                    <Link href='/allclubevents'>Events</Link>
                    {email && <Link href='/myclubevents'>My Events</Link>}
                    {email && <Link href='/create'>Create a Club</Link>}
                </div>
                <div className='flex flex-col items-center text-sm'>
                    {email && <p className='' title={email as string}>{`Welcome, ${name}`}</p>}
                    {email && <SignOutButton />}
                    {!email && <SignInButton />}
                </div>
            </div>
        </div>
    )
}

function SignInButton() {
    const signIn = async () => {
        await auth.signInWithPopup(provider);
    };

    return (
        <button className='hover:bg-uclablue hover:text-white ml-1 px-3 py-1 rounded-md font-medium transition' onClick={signIn}>Sign In</button>
    );
}

function SignOutButton() {
    return <button className='hover:bg-uclablue hover:text-white ml-1 px-3 py-1 rounded-md font-medium transition' onClick={() => auth.signOut()}>Sign Out</button>
}
