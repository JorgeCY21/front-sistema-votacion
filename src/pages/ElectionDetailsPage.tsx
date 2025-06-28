import { useParams } from 'react-router-dom'
import { electionsData } from '../data/electionsData'

export function ElectionDetailsPage() {
  const { id } = useParams<{ id: string }>()
  const election = electionsData.find(e => e.id === id)

  if (!election) {
    return <div className="p-6 text-center text-gray-500">Elección no encontrada.</div>
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 sm:p-8">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow-lg">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">{election.title}</h1>
        <p className="text-gray-600 mb-4">{election.description}</p>
        <div className="text-sm text-gray-500 mb-6">
          <p>📅 {election.startDate} - {election.endDate}</p>
          <p>📊 Total votantes: {election.totalVoters ?? 0}</p>
          <p>🧾 Votos emitidos: {election.votesCount ?? 0}</p>
        </div>

        <h2 className="text-lg font-semibold text-gray-700 mb-3">Candidatos</h2>
        {election.candidates.length === 0 ? (
          <p className="text-gray-500">No hay candidatos registrados.</p>
        ) : (
          <div className="space-y-4">
            {election.candidates.map(c => (
              <div key={c.id} className="flex items-center justify-between bg-gray-50 p-4 rounded-lg border">
                <div className="flex items-center space-x-4">
                  <img src={c.imageUrl} alt={c.name} className="w-12 h-12 rounded-full object-cover" />
                  <div>
                    <p className="font-medium text-gray-800">{c.name}</p>
                    <p className="text-sm text-gray-500">{c.party}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-indigo-600 font-semibold text-lg">{c.votes ?? 0}</p>
                  <p className="text-xs text-gray-500">votos</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
