import { useAuth } from '../context/AuthContext'
import { AdminHomePage } from './AdminHomePage'
import { VoterHomePage } from './VoterHomePage'

export function HomePage() {
  const { user } = useAuth()

  if (!user) return null // o un loader

  if (user.role === 'admin') {
    return <AdminHomePage />
  }

  return <VoterHomePage />
}
