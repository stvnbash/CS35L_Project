//@ts-nocheck

import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import NextNProgress from "nextjs-progressbar";
import Layout from '../components/Layout'

import { UserContext } from '../lib/context';
import { useUserData } from '../lib/hooks';

export default function App({ Component, pageProps: {...pageProps } }: AppProps) {

  // supply context
  const userData = useUserData();
  
  return (
    <UserContext.Provider value={ userData }>
      <NextNProgress color="#FFD100" />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </UserContext.Provider>
  )
}
