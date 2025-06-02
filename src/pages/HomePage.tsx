import { useAuth } from '../context/AuthContext'
import { Header } from '../components/Header'
import { useState } from 'react'

export function HomePage() {
  const { user, logout } = useAuth()
  const [hasVoted, setHasVoted] = useState(false) // Esto debería venir del backend

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />

      <main className="flex-grow w-full max-w-6xl bg-white rounded-lg shadow-md p-8 mx-auto mt-10 mb-10">
        <header className="mb-8">
          <h1 className="text-4xl font-extrabold text-blue-700 mb-2">
            ¡Bienvenido, {user}!
          </h1>
          <p className="text-gray-700 max-w-3xl leading-relaxed">
            Este sistema de votación electrónica distribuido está diseñado para realizar procesos de votación seguros, eficientes y confiables.
          </p>
        </header>

        {/* Sección de acciones principales */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {/* Tarjetas de acciones... */}
        </section>

        {/* Sección de elecciones activas */}
        <section className="mb-10">
          {/* Tabla de elecciones... */}
        </section>

        {/* Sección de participación si ya votó */}
        {hasVoted && (
          <section className="mb-10 bg-gray-50 p-6 rounded-lg">
            {/* Contenido de participación... */}
          </section>
        )}

        {/* Sección de notificaciones */}
        <section className="mb-10">
          {/* Notificaciones... */}
        </section>

        {/* Sección de características (original) */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800 border-b border-gray-300 pb-2">
            Características del sistema
          </h2>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            <li><strong>Integridad y confidencialidad:</strong> Los votos están protegidos y solo accesibles para el sistema autorizado.</li>
            <li><strong>Disponibilidad:</strong> Sistema distribuido que garantiza acceso continuo y sin interrupciones.</li>
            <li><strong>Coordinación y concurrencia:</strong> Manejo de múltiples usuarios votando simultáneamente sin errores.</li>
            <li><strong>Transacciones distribuidas:</strong> Cada voto es registrado y confirmado en la red sin pérdida de información.</li>
          </ul>
        </section>

        <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            Sistema de Votación Electrónica v1.0 - © 2023
          </p>
          <button
            onClick={logout}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-md shadow-md transition"
          >
            Cerrar sesión
          </button>
        </div>
      </main>
    </div>
  )
}