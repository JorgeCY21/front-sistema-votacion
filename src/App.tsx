import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import { LoginPage } from './pages/LoginPage'
import { HomePage } from './pages/HomePage'
import { useAuth } from './context/AuthContext'
import { Header } from './components/Header'

export function App() {
  const { user } = useAuth()

  return (
    <BrowserRouter>
      <Header />  {/* Aquí va el header */}
      <Routes>
        <Route
          path="/"
          element={user ? <Navigate to="/home" /> : <LoginPage />}
        />
        <Route
          path="/home"
          element={user ? <HomePage /> : <Navigate to="/" />}
        />
      </Routes>
    </BrowserRouter>
  )
}
