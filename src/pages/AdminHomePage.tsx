import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Header } from '../components/Header'
import type { Election } from '../data/electionsData'
import { electionsData } from '../data/electionsData'

const StatusBadge = ({ status }: { status: Election['status'] }) => {
  const map = {
    activo: 'bg-green-100 text-green-800',
    pendiente: 'bg-blue-100 text-blue-800',
    cerrado: 'bg-gray-100 text-gray-800'
  }
  return (
    <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${map[status]}`}>
      {status.toUpperCase()}
    </span>
  )
}

const SectionHeader = ({
  title,
  count,
  color,
}: {
  title: string
  count: number
  color: string
}) => (
  <div className="flex items-center justify-between mb-5">
    <h2 className="text-2xl font-semibold text-gray-800">{title}</h2>
    <span className={`px-3 py-1 ${color} text-sm font-medium rounded-full`}>
      {count} {title.toLowerCase().includes('cerradas') ? 'finalizadas' : 'registradas'}
    </span>
  </div>
)

export function AdminHomePage() {
  const [elections, setElections] = useState<Election[]>(electionsData)

  const active = elections.filter(e => e.status === 'activo')
  const upcoming = elections.filter(e => e.status === 'pendiente')
  const closed = elections.filter(e => e.status === 'cerrado')

  const handleDelete = (id: string) => {
    if (confirm('¿Estás seguro de eliminar esta elección?')) {
      setElections(prev => prev.filter(e => e.id !== id))
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />

      <main className="flex-1 overflow-y-auto p-6 sm:p-8 bg-gradient-to-b from-gray-50 to-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-4 md:mb-0">
              Panel Administrativo de Elecciones
            </h1>
            <Link
              to="/crear-eleccion"
              className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg shadow-md transition-colors duration-200 flex items-center space-x-2"
            >
              <span>+</span>
              <span>Crear Nueva Elección</span>
            </Link>
          </div>

          {/* Elecciones activas */}
          <section className="mb-10">
            <SectionHeader title="Elecciones Activas" count={active.length} color="bg-green-100 text-green-800" />
            {active.length === 0 ? (
              <EmptySection to="/crear-eleccion" message="No hay elecciones activas." />
            ) : (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {active.map(e => (
                  <ElectionCard key={e.id} election={e} onDelete={handleDelete} />
                ))}
              </div>
            )}
          </section>

          {/* Próximas elecciones */}
          <section className="mb-10">
            <SectionHeader title="Próximas Elecciones" count={upcoming.length} color="bg-blue-100 text-blue-800" />
            {upcoming.length === 0 ? (
              <EmptyText message="No hay elecciones programadas." />
            ) : (
              <ElectionTable elections={upcoming} onDelete={handleDelete} />
            )}
          </section>

          {/* Elecciones cerradas */}
          <section>
            <SectionHeader title="Elecciones Cerradas" count={closed.length} color="bg-gray-100 text-gray-800" />
            {closed.length === 0 ? (
              <EmptyText message="No hay elecciones finalizadas." />
            ) : (
              <div className="space-y-3">
                {closed.map(e => (
                  <ClosedElection key={e.id} election={e} />
                ))}
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  )
}

function ElectionCard({
  election,
  onDelete
}: {
  election: Election
  onDelete: (id: string) => void
}) {
  return (
    <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200">
      <div className="flex justify-between items-start mb-3">
        <h3 className="font-semibold text-lg text-gray-800">{election.title}</h3>
        <StatusBadge status={election.status} />
      </div>
      <p className="text-sm text-gray-600 mb-4">{election.description}</p>
      <div className="text-xs text-gray-500 mb-4">
        <div className="flex items-center space-x-1 mb-1">
          <span>🗓️</span>
          <span>{election.startDate} - {election.endDate}</span>
        </div>
        <div className="flex items-center space-x-1">
          <span>👥</span>
          <span>{(election as any).totalVoters || 0} votantes registrados</span>
        </div>
      </div>
      <div className="flex space-x-2 pt-3 border-t border-gray-100">
        <Link to={`/editar-eleccion/${election.id}`} className="flex-1 px-3 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-lg text-sm font-medium text-center">
          Editar
        </Link>
        <button
          onClick={() => onDelete(election.id)}
          className="flex-1 px-3 py-2 bg-red-50 hover:bg-red-100 text-red-700 rounded-lg text-sm font-medium"
        >
          Eliminar
        </button>
      </div>
    </div>
  )
}

function ElectionTable({
  elections,
  onDelete
}: {
  elections: Election[]
  onDelete: (id: string) => void
}) {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Título</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Descripción</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Fecha</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Estado</th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Acciones</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {elections.map(e => (
            <tr key={e.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 font-medium text-gray-900">{e.title}</td>
              <td className="px-6 py-4 text-sm text-gray-500 truncate max-w-xs">{e.description}</td>
              <td className="px-6 py-4 text-sm text-gray-500">{e.startDate} - {e.endDate}</td>
              <td className="px-6 py-4"><StatusBadge status={e.status} /></td>
              <td className="px-6 py-4 text-right text-sm font-medium space-x-2">
                <Link to={`/editar-eleccion/${e.id}`} className="text-indigo-600 hover:text-indigo-900">Editar</Link>
                <button onClick={() => onDelete(e.id)} className="text-red-600 hover:text-red-900">Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function ClosedElection({ election }: { election: Election }) {
  return (
    <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200 flex flex-col sm:flex-row justify-between items-start sm:items-center">
      <div className="mb-3 sm:mb-0">
        <div className="flex items-center space-x-3">
          <h3 className="font-medium text-gray-800">{election.title}</h3>
          <StatusBadge status={election.status} />
        </div>
        <p className="text-sm text-gray-600 mt-1">{election.startDate} - {election.endDate}</p>
      </div>
      <div className="flex space-x-2 w-full sm:w-auto">
        <Link
          to={`/resultados/${election.id}`}
          className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 text-sm font-medium rounded-lg"
        >
          Ver resultados
        </Link>
      </div>
    </div>
  )
}

function EmptySection({ to, message }: { to: string; message: string }) {
  return (
    <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 text-center">
      <p className="text-gray-500 mb-4">{message}</p>
      <Link
        to={to}
        className="inline-block px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg"
      >
        Crear nueva elección
      </Link>
    </div>
  )
}

function EmptyText({ message }: { message: string }) {
  return (
    <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
      <p className="text-gray-500">{message}</p>
    </div>
  )
}
