import Link from 'next/link'
import { auth, provider } from '../lib/firebase'
import { useContext } from 'react';
import { UserContext } from '../lib/context';

export default function Component() {
    // get context from _app
    const { name, email, uid } = useContext(UserContext);
    
    return (
        <div className='bg-slate-900 text-white p-3'>
        <div className="flex flex-row justify-between items-center max-w-6xl lg:max-w-7xl xl:max-w-8xl mx-auto">
            <Link href='/' className="p-2 text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-sky-300">UCLA ClubHUB</Link>
            <div className='flex flex-col items-center text-sm'>
                {email && <p className='' title={email as string}>{`Welcome, ${name}`}</p>}
                {email && <SignOutButton/>}
                {!email && <SignInButton/>}
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
        <button className='hover:bg-uclablue hover:text-white ml-1 px-3 py-1 rounded-md font-medium transition' onClick={ signIn }>Sign In</button>
    );
}

function SignOutButton() {
    return <button className='hover:bg-uclablue hover:text-white ml-1 px-3 py-1 rounded-md font-medium transition' onClick={ () => auth.signOut() }>Sign Out</button>
}