import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import { LoginPage } from './pages/LoginPage'
import { HomePage } from './pages/HomePage'
import { useAuth } from './context/AuthContext'
import { CreateElection } from './pages/CreateElection'

export function App() {
  const { user } = useAuth()

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={user ? <Navigate to="/home" /> : <LoginPage />}
        />
        <Route
          path="/home"
          element={user ? <HomePage /> : <Navigate to="/" />}
        />
        <Route
          path="/crear-eleccion"
          element={user ? <CreateElection /> : <Navigate to="/" />}
        />
      </Routes>
    </BrowserRouter>
  )
}
