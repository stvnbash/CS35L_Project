import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { SessionProvider } from "next-auth/react"
import NextNProgress from "nextjs-progressbar";
import { initializeApp } from 'firebase/app';
// import firebase from '../firebase/clientApp';
import Layout from '../components/Layout'

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  // const firebaseConfig = {
  //   apiKey: process.env.FIREBASE_API_KEY,
  //   authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  //   databaseURL: process.env.FIREBASE_DATABASE_URL,
  //   projectId: process.env.FIREBASE_PROJECT_ID,
  //   storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  //   messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  //   appId: process.env.FIREBASE_APP_ID,
  //   // measurementId: "G-8GSGZQ44ST",
  // }
  // const app = initializeApp(firebaseConfig);


  return (
    <SessionProvider session={session}>
      <NextNProgress color="#FFD100" />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  )
}
