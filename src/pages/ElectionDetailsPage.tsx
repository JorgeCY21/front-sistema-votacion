import { useParams, useNavigate } from 'react-router-dom'
import { electionsData } from '../data/electionsData'

export function ElectionDetailsPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const election = electionsData.find(e => e.id === id)

  if (!election) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-6">
        <div className="max-w-md bg-white p-8 rounded-xl shadow-lg text-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h2 className="text-2xl font-bold text-gray-800 mt-4">Elección no encontrada</h2>
          <p className="text-gray-600 mt-2 mb-6">La elección que buscas no existe o ha sido eliminada.</p>
          <button
            onClick={() => navigate('/home')}
            className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors shadow hover:shadow-md"
          >
            Volver al inicio
          </button>
        </div>
      </div>
    )
  }

  // Calcular porcentajes de votos
  const totalVotes = election.votesCount || 1
  const candidatesWithPercentage = election.candidates.map(candidate => ({
    ...candidate,
    percentage: Math.round(((candidate.votes || 0) / totalVotes) * 100)
  }))

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6 sm:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header con botón de regreso */}
        <div className="flex items-center mb-6">
          <button 
            onClick={() => navigate('/home')}
            className="mr-4 p-2 rounded-full hover:bg-gray-200 transition-colors cursor-pointer"
            aria-label="Volver"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </button>
          <h1 className="text-3xl font-bold text-gray-800">{election.title}</h1>
        </div>

        {/* Tarjeta principal */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Banner superior */}
          <div className="bg-gradient-to-r from-indigo-500 to-blue-600 p-6 text-white">
            <p className="text-lg font-medium">{election.description}</p>
          </div>

          {/* Información de la elección */}
          <div className="p-6 sm:p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <div>
                    <p className="text-sm text-gray-500">Fecha de inicio</p>
                    <p className="font-semibold text-gray-800">{new Date(election.startDate).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <div>
                    <p className="text-sm text-gray-500">Fecha de cierre</p>
                    <p className="font-semibold text-gray-800">{new Date(election.endDate).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <p className="text-sm text-gray-500">Estado</p>
                    <p className="font-semibold text-gray-800 capitalize">
                      {election.status === 'activo' ? (
                        <span className="text-green-600">Activo</span>
                      ) : election.status === 'cerrado' ? (
                        <span className="text-red-600">Cerrado</span>
                      ) : (
                        <span className="text-yellow-600">Pendiente</span>
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Estadísticas */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Participación</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700">Votantes registrados</span>
                      <span className="text-sm font-medium text-gray-500">{election.totalVoters ?? 0}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div 
                        className="bg-blue-600 h-2.5 rounded-full" 
                        style={{ width: `${Math.min(100, ((election.votesCount || 0) / (election.totalVoters || 1)) * 100)}%` }}
                      ></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700">Votos emitidos</span>
                      <span className="text-sm font-medium text-gray-500">{election.votesCount ?? 0}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div 
                        className="bg-indigo-600 h-2.5 rounded-full" 
                        style={{ width: `${Math.min(100, ((election.votesCount || 0) / (election.totalVoters || 1)) * 100)}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Resumen</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total candidatos</span>
                    <span className="font-medium">{election.candidates.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Participación</span>
                    <span className="font-medium">
                      {Math.round(((election.votesCount || 0) / (election.totalVoters || 1)) * 100)}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Duración</span>
                    <span className="font-medium">
                      {Math.ceil
                        (new Date(election.endDate).getTime() - new Date(election.startDate).getTime()
                      ) / (1000 * 60 * 60 * 24)} días
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Lista de candidatos */}
            <div>
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                Candidatos
              </h2>

              {election.candidates.length === 0 ? (
                <div className="bg-gray-50 rounded-lg p-8 text-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="mt-3 text-gray-500 font-medium">No hay candidatos registrados en esta elección</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {candidatesWithPercentage.map(candidate => (
                    <div key={candidate.id} className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex flex-col sm:flex-row sm:items-center">
                        <div className="flex items-center mb-4 sm:mb-0 sm:w-1/3">
                          <img 
                            src={candidate.imageUrl || 'https://via.placeholder.com/80'} 
                            alt={candidate.name} 
                            className="w-16 h-16 rounded-full object-cover border-2 border-white shadow"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement
                              target.src = 'https://via.placeholder.com/80'
                            }}
                          />
                          <div className="ml-4">
                            <h3 className="font-semibold text-gray-800">{candidate.name}</h3>
                            <p className="text-sm text-gray-500">{candidate.party}</p>
                          </div>
                        </div>

                        <div className="sm:w-2/3">
                          <div className="flex justify-between mb-1">
                            <span className="text-sm font-medium text-gray-700">
                              {candidate.votes || 0} votos
                            </span>
                            <span className="text-sm font-medium text-indigo-600">
                              {candidate.percentage}%
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div 
                              className="h-2.5 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600" 
                              style={{ width: `${candidate.percentage}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}