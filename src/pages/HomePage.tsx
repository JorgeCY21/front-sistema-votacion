// src/components/HomePage.tsx
import React from 'react'
import { useAuth } from '../context/AuthContext'

export function HomePage() {
  const { user, logout } = useAuth()

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">¡Hola, {user}!</h1>
      <p>Bienvenido al sistema de votación.</p>
      <button
        onClick={logout}
        className="mt-6 px-4 py-2 bg-red-500 text-white rounded"
      >
        Cerrar sesión
      </button>
    </div>
  )
}
