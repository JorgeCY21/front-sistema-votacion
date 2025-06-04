import { useState } from 'react'
import { Header } from '../components/Header'
import type { Election } from '../data/electionsData'
import { electionsData } from '../data/electionsData'
import { Link } from 'react-router-dom'

export function AdminHomePage() {
  const [elections, setElections] = useState<Election[]>(electionsData)

  const activeElections = elections.filter(e => e.status === 'activo')
  const upcomingElections = elections.filter(e => e.status === 'pendiente')
  const closedElections = elections.filter(e => e.status === 'cerrado')

  const handleDelete = (id: string) => {
    if (confirm('¿Estás seguro de eliminar esta elección?')) {
      setElections(elections.filter(e => e.id !== id))
    }
  }

  const StatusBadge = ({ status }: { status: string }) => {
    const colors = {
      active: 'bg-green-100 text-green-700',
      upcoming: 'bg-yellow-100 text-yellow-700',
      closed: 'bg-gray-200 text-gray-700',
    }
    return (
      <span className={`text-xs font-semibold px-2 py-1 rounded ${colors[status as keyof typeof colors] || ''}`}>
        {status.toUpperCase()}
      </span>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r p-6 hidden sm:block">
        <h2 className="text-xl font-bold mb-6 text-blue-700">Administración</h2>
        <nav className="space-y-4 text-gray-700">
          <a href="#" className="block hover:text-blue-600">🏠 Panel Principal</a>
          <Link to="/crear-eleccion" className="mb-6 inline-block px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded shadow">
            🗳️ Crear Nueva Elección
          </Link>
          <a href="#" className="block hover:text-blue-600">📊 Resultados</a>
          <a href="#" className="block hover:text-blue-600">📁 Historial</a>
          <a href="#" className="block hover:text-blue-600">⚙️ Configuración</a>
        </nav>
      </aside>

      <div className="flex-grow">
        <Header />

        <main className="max-w-7xl mx-auto px-4 sm:px-8 py-8">
          <h1 className="text-3xl font-bold text-blue-700 mb-6">Panel Administrativo</h1>

          <button className="mb-6 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded shadow">
            Crear Nueva Elección
          </button>

          {/* Activas */}
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
                      <p className="text-xs text-gray-400">Fecha: {election.startDate} al {election.endDate}</p>
                      <StatusBadge status={election.status} />
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

          {/* Próximas */}
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
                    <p className="text-xs text-gray-400">Fecha: {election.startDate} al {election.endDate}</p>
                    <StatusBadge status={election.status} />
                  </li>
                ))}
              </ul>
            )}
          </section>

          {/* Cerradas */}
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
                    <p className="text-xs text-gray-400">Fecha: {election.startDate} al {election.endDate}</p>
                    <StatusBadge status={election.status} />
                  </li>
                ))}
              </ul>
            )}
          </section>
        </main>
      </div>
    </div>
  )
}
