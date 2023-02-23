import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import { useEffect } from 'react'
import { useSession, signIn, signOut } from "next-auth/react"

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  const { data: session, status } = useSession()
  
  return (
    <div>
      {status !== "loading" && session && <p className='' title={session.user.email as string}>{`Welcome, ${session.user.name}`}</p>}
    </div>
  )
}
