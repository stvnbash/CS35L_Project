import { Inter } from '@next/font/google'
import Intro from '../components/Intro'
import MyClubs from '../components/MyClubs'
import AllClubs from '../components/AllClubs'
import { useUserData } from '@/lib/hooks'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const userData = useUserData();
  const user = userData;
  
  return (
    <div>
      <Intro />
      {user.username && <MyClubs />}
      <AllClubs />
    </div>
  )
}