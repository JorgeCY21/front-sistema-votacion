import { useState } from 'react'
import { Header } from '../components/Header'
import type { Election } from '../data/electionsData'
import { electionsData } from '../data/electionsData'

export function AdminHomePage() {
  const [elections, setElections] = useState<Election[]>(electionsData)

  // Filtros para mostrar por estado
  const activeElections = elections.filter(e => e.status === 'active')
  const upcomingElections = elections.filter(e => e.status === 'upcoming')
  const closedElections = elections.filter(e => e.status === 'closed')

  // Ejemplo simple para eliminar una elección (sin backend)
  const handleDelete = (id: string) => {
    if (confirm('¿Estás seguro de eliminar esta elección?')) {
      setElections(elections.filter(e => e.id !== id))
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />

      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-8 py-8">
        <h1 className="text-3xl font-bold text-blue-700 mb-6">Panel Administrativo</h1>

        <button className="mb-6 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded shadow">
          Crear Nueva Elección
        </button>

        {/* Sección Elecciones Activas */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Elecciones Activas</h2>
          {activeElections.length === 0 ? (
            <p className="text-gray-600">No hay elecciones activas.</p>
          ) : (
            <div className="space-y-4">
              {activeElections.map(election => (
                <div key={election.id} className="bg-white p-4 rounded shadow flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold">{election.title}</h3>
                    <p className="text-sm text-gray-600">{election.description}</p>
                    <p className="text-xs text-gray-400">Fecha: {election.date}</p>
                  </div>
                  <div className="space-x-2">
                    <button className="px-3 py-1 bg-yellow-400 hover:bg-yellow-500 text-gray-900 rounded">Editar</button>
                    <button
                      onClick={() => handleDelete(election.id)}
                      className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded"
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Sección Próximas Elecciones */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Próximas Elecciones</h2>
          {upcomingElections.length === 0 ? (
            <p className="text-gray-600">No hay elecciones próximas.</p>
          ) : (
            <ul className="space-y-3">
              {upcomingElections.map(election => (
                <li key={election.id} className="bg-white p-4 rounded shadow border border-blue-100">
                  <h3 className="font-semibold">{election.title}</h3>
                  <p className="text-sm text-gray-600">{election.description}</p>
                  <p className="text-xs text-gray-400">Fecha: {election.date}</p>
                </li>
              ))}
            </ul>
          )}
        </section>

        {/* Sección Elecciones Cerradas */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Elecciones Cerradas</h2>
          {closedElections.length === 0 ? (
            <p className="text-gray-600">No hay elecciones cerradas.</p>
          ) : (
            <ul className="space-y-3">
              {closedElections.map(election => (
                <li key={election.id} className="bg-white p-4 rounded shadow border border-gray-200">
                  <h3 className="font-semibold">{election.title}</h3>
                  <p className="text-sm text-gray-600">{election.description}</p>
                  <p className="text-xs text-gray-400">Fecha: {election.date}</p>
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>
    </div>
  )
}
