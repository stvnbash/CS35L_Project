// @ts-nocheck

import { UserContext } from "@/lib/context"
import { useContext } from "react"

export default function Intro() {
    // get context from _app
    const { name, email, uid } = useContext(UserContext)
    return (
        <>
        <div>
            {<h1 className="text-1xl sm:text-2xl lg:text-4xl font-bold">
                WELCOME
                {name ? 
                `, ${name.toUpperCase() as string}, ` 
                : 
                ``} TO THE 
                </h1>}
            <h1 className="mb-6 text-5xl sm:text-6xl lg:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-sky-500 hover:from-emerald-500 hover:to-sky-500 ease-in-out transition-all">
                UCLA Club
                <span className="mx-1 px-1 rounded-xl bg-gradient-to-r to-emerald-500 from-sky-500 text-slate-300 text-4xl sm:text-5xl lg:text-7xl">
                    hub
                    </span>
                    </h1>
        </div>
        </>
    )
}