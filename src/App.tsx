import React from 'react'
import { LoginPage } from './pages/LoginPage'
import { HomePage } from './pages/HomePage'
import { useAuth } from './context/AuthContext'

export function App() {
  const { user } = useAuth()
  return user ? <HomePage /> : <LoginPage />
}
