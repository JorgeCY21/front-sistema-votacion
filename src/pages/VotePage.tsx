import { useParams, useNavigate } from 'react-router-dom'
import { electionsData } from '../data/electionsData'
import { useState } from 'react'
import { Button } from '../components/ui/Button'
import { Header } from '../components/Header'

export function VotePage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const election = electionsData.find(e => e.id === id)

  const [selectedCandidate, setSelectedCandidate] = useState<string | null>(null)
  const [confirmed, setConfirmed] = useState(false)

  const handleVote = () => {
    if (!selectedCandidate) return
    setConfirmed(true)
    setTimeout(() => {
      navigate('/home')
    }, 3000)
  }

  if (!election) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-gray-700">
        <h1 className="text-3xl font-bold mb-4">Elección no encontrada</h1>
        <Button onClick={() => navigate(-1)}>Volver</Button>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-4xl mx-auto py-10 px-4 sm:px-6">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">{election.title}</h1>
        <p className="text-gray-600 mb-6">{election.description}</p>
        <p className="text-sm text-gray-500 mb-10">
          Desde {new Date(election.startDate).toLocaleDateString()} hasta {new Date(election.endDate).toLocaleDateString()}
        </p>

        <h2 className="text-2xl font-semibold mb-4">Candidatos</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
          {election.candidates.map((candidate) => (
            <div
              key={candidate.id}
              onClick={() => setSelectedCandidate(candidate.id)}
              className={`cursor-pointer border rounded-xl p-4 shadow-sm transition-all ${
                selectedCandidate === candidate.id
                  ? 'border-blue-500 ring-2 ring-blue-300'
                  : 'border-gray-200 hover:border-blue-300'
              }`}
            >
              <img
                src={candidate.imageUrl}
                alt={candidate.name}
                className="w-full h-40 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-bold text-gray-800">{candidate.name}</h3>
              <p className="text-gray-600">{candidate.party}</p>
            </div>
          ))}
        </div>

        {selectedCandidate && !confirmed && (
          <div className="text-center space-y-4">
            <p className="text-lg">
              Has seleccionado a{' '}
              <strong>
                {election.candidates.find(c => c.id === selectedCandidate)?.name}
              </strong>
            </p>
            <Button onClick={handleVote} className="px-6 py-3 text-lg">
              Confirmar voto
            </Button>
          </div>
        )}

        {confirmed && (
          <div className="text-center text-green-600 mt-6">
            <h3 className="text-xl font-semibold">¡Voto registrado exitosamente!</h3>
            <p className="text-gray-600">Serás redirigido a la página principal en unos segundos...</p>
          </div>
        )}
      </main>
    </div>
  )
}
