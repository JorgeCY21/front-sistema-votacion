import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import { LoginPage } from './pages/LoginPage'
import { HomePage } from './pages/HomePage'
import { CreateElection } from './pages/CreateElection'
import { ManageCandidates } from './pages/ManageCandidates'
import { useAuth } from './context/AuthContext'
import { EditarEleccionPage } from './pages/EditarEleccionPage'

export function App() {
  const { user } = useAuth()

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={user ? <Navigate to="/home" /> : <LoginPage />} />
        <Route path="/home" element={user ? <HomePage /> : <Navigate to="/" />} />
        <Route path="/crear-eleccion" element={user ? <CreateElection /> : <Navigate to="/" />} />
        <Route path="/manage-candidates/:id" element={user ? <ManageCandidates /> : <Navigate to="/" />} />
        <Route path="/editar-eleccion/:id" element={<EditarEleccionPage />} />

      </Routes>
    </BrowserRouter>
  )
}
