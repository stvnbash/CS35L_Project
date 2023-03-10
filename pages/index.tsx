import Intro from '../components/Intro'
import MyClubs from '../components/MyClubs'
import AllClubs from '../components/AllClubs'

import { UserContext } from '@/lib/context'
import { useContext } from 'react'

export default function Home() {
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