import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const VITE_BASE_URL = import.meta.env.VITE_BASE_URL

export const useAuthActions = () => {
  const navigate = useNavigate()
  const { setUser } = useAuth()

  const signOut = async () => {
    try {
      await fetch(`${VITE_BASE_URL}/auth/logout`, {
        credentials: 'include'
      })
      setUser(null)
      navigate('/')
    } catch (err) {
      console.error('Error signing out:', err)
    }
  }

  return { signOut }
}