// @ts-nocheck

import Intro from '../components/Intro'
import MyClubs from '../components/MyClubs'
import AllClubs from '../components/AllClubs'

import { UserContext } from '@/lib/context'
import { useContext } from 'react'

import { firestore } from '@/lib/firebase'

export async function getServerSideProps(context) {

  const q = firestore.collection("clubs")
  .orderBy('name');
  console.log(q);

  const clubs = (await q.get()).docs;
  return {
    props: { clubs: JSON.parse(JSON.stringify(clubs)) }, // will be passed to the page component as props
  };
}


export default function Home({ clubs }) {
  console.log(clubs)
  // get context from _app
  const { name, email, uid } = useContext(UserContext);

  return (
    <div>
      <Intro />
      {name && <MyClubs />}
      <AllClubs />
    </div>
  )
}

