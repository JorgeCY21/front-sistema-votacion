import { useAuth } from '../context/AuthContext'
import { Header } from '../components/Header'
import { useState } from 'react'
import type { Election } from '../data/electionsData'
import { electionsData } from '../data/electionsData'


export function HomePage() {
  const { logout } = useAuth()
  const [elections] = useState<Election[]>(electionsData)

  const availableElections = elections.filter(e => e.status === 'active')
  const upcomingElections = elections.filter(e => e.status === 'upcoming')
  const pastElections = elections.filter(e => e.status === 'closed')

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />

      <main className="flex-grow w-full px-4 sm:px-8 py-8">
        <div className="max-w-7xl mx-auto">
          <section className="mb-10">
            <h2 className="text-3xl font-bold text-blue-700 mb-4">
              Elecciones Disponibles
            </h2>
            {availableElections.length === 0 ? (
              <p className="text-gray-600">No hay elecciones activas en este momento.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {availableElections.map(election => (
                  <div key={election.id} className="bg-white p-4 rounded-lg shadow hover:shadow-md transition">
                    <h3 className="text-lg font-semibold text-gray-800">{election.title}</h3>
                    <p className="text-gray-600 text-sm">{election.description}</p>
                    <p className="text-sm mt-2 text-gray-500">Fecha: {election.date}</p>
                    <button className="mt-3 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded">
                      Votar
                    </button>
                  </div>
                ))}
              </div>
            )}
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Próximas Elecciones</h2>
            {upcomingElections.length === 0 ? (
              <p className="text-gray-600">No hay elecciones próximas registradas.</p>
            ) : (
              <ul className="space-y-3">
                {upcomingElections.map(election => (
                  <li key={election.id} className="bg-white p-4 rounded-lg shadow-sm border border-blue-100">
                    <strong>{election.title}</strong> — {election.date}
                    <p className="text-sm text-gray-600">{election.description}</p>
                  </li>
                ))}
              </ul>
            )}
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Historial de Elecciones</h2>
            {pastElections.length === 0 ? (
              <p className="text-gray-600">Aún no has participado en elecciones anteriores.</p>
            ) : (
              <ul className="space-y-3">
                {pastElections.map(election => (
                  <li key={election.id} className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                    <strong>{election.title}</strong> — {election.date}
                    <p className="text-sm text-gray-600">
                      {election.alreadyVoted ? 'Tu voto fue registrado.' : 'No participaste.'}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </section>

          <div className="flex justify-end mt-12">
            <button
              onClick={logout}
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-md shadow-md transition"
            >
              Cerrar sesión
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}
