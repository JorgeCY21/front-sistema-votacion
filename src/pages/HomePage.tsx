import { useAuth } from '../context/AuthContext'
import { Header } from '../components/Header'
import { useEffect, useState } from 'react'
import { CheckCircle, Vote, Clock3, History } from 'lucide-react'

interface Election {
  id: string
  title: string
  description: string
  status: 'active' | 'closed' | 'upcoming'
  alreadyVoted: boolean
  date: string
}

export function HomePage() {
  const { user, logout } = useAuth()
  const [elections, setElections] = useState<Election[]>([])

  useEffect(() => {
    // Simulación de datos desde el backend
    const fetchElections = async () => {
      const data: Election[] = [
        {
          id: '1',
          title: 'Elección de Alcalde 2025',
          description: 'Vota por el próximo alcalde.',
          status: 'active',
          alreadyVoted: false,
          date: '2025-06-10',
        },
        {
          id: '2',
          title: 'Elección Universitaria',
          description: 'Representante estudiantil.',
          status: 'closed',
          alreadyVoted: true,
          date: '2025-05-12',
        },
        {
          id: '3',
          title: 'Consulta Nacional',
          description: 'Participa en la decisión nacional.',
          status: 'upcoming',
          alreadyVoted: false,
          date: '2025-07-01',
        },
      ]
      setElections(data)
    }

    fetchElections()
  }, [])

  const activeElections = elections.filter(e => e.status === 'active')
  const upcomingElections = elections.filter(e => e.status === 'upcoming')
  const pastElections = elections.filter(e => e.status === 'closed')

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex flex-col">
      <Header />

      <main className="flex-grow w-full px-4 py-8 md:px-10 max-w-7xl mx-auto">
        <div className="mb-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-blue-700 mb-2">
            ¡Bienvenido, {user}!
          </h1>
          <p className="text-gray-700 text-base md:text-lg">
            Consulta y participa en las votaciones disponibles.
          </p>
        </div>

        {/* Sección: Elecciones disponibles */}
        <Section title="🗳️ Elecciones disponibles" icon={<Vote size={20} />} items={activeElections}>
          {(e) => (
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition">
              <Vote size={16} className="inline-block mr-2" />
              Votar ahora
            </button>
          )}
        </Section>

        {/* Sección: Futuras elecciones */}
        <Section title="📅 Futuras elecciones" icon={<Clock3 size={20} />} items={upcomingElections}>
          {(e) => (
            <span className="text-sm text-gray-500">Fecha: {e.date}</span>
          )}
        </Section>

        {/* Sección: Historial de elecciones */}
        <Section title="📂 Historial de elecciones" icon={<History size={20} />} items={pastElections}>
          {(e) => (
            <span className="text-green-600 flex items-center gap-1 text-sm">
              <CheckCircle size={16} /> Votaste
            </span>
          )}
        </Section>

        <div className="flex justify-between items-center mt-12 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            Sistema de Votación Electrónica v1.0 - © 2025
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

// Componente reutilizable para secciones
function Section({
  title,
  icon,
  items,
  children,
}: {
  title: string
  icon: React.ReactNode
  items: Election[]
  children: (e: Election) => React.ReactNode
}) {
  return (
    <section className="mb-10">
      <h2 className="text-2xl font-semibold text-gray-800 flex items-center gap-2 mb-4 border-b border-gray-300 pb-1">
        {icon} {title}
      </h2>

      {items.length === 0 ? (
        <p className="text-gray-500 text-sm">No hay resultados en esta sección.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((election) => (
            <div key={election.id} className="bg-white shadow-md p-4 rounded-lg border border-gray-200">
              <h3 className="text-lg font-bold text-blue-700">{election.title}</h3>
              <p className="text-gray-600 text-sm mb-2">{election.description}</p>
              <p className="text-gray-400 text-xs mb-3">Fecha: {election.date}</p>
              {children(election)}
            </div>
          ))}
        </div>
      )}
    </section>
  )
}
