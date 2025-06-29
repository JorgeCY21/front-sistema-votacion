import { Header } from '../components/Header'
import { useState } from 'react'
import type { Election } from '../data/electionsData'
import { electionsData } from '../data/electionsData'
import { useNavigate } from 'react-router-dom'
import { Button } from '../components/ui/Button'

export function VoterHomePage() {
  const navigate = useNavigate()
  const [elections] = useState<Election[]>(electionsData)

  const availableElections = elections.filter(e => e.status === 'activo')
  const upcomingElections = elections.filter(e => e.status === 'pendiente')
  const pastElections = elections.filter(e => e.status === 'cerrado')

  // Función para formatear fechas
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' }
    return new Date(dateString).toLocaleDateString('es-ES', options)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex flex-col">
      <Header />

      <main className="flex-grow w-full px-4 sm:px-6 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <section className="mb-12 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#00ABE4] to-[#0096c7]">
                Participa en las Elecciones
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Ejerce tu derecho al voto y forma parte del cambio en tu comunidad
            </p>
          </section>

          {/* Elecciones activas */}
          <section className="mb-16">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-bold text-gray-800 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mr-2 text-[#00ABE4]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Elecciones Disponibles
              </h2>
              <span className="bg-blue-100 text-[#0077a3] text-sm font-medium px-3 py-1 rounded-full">
                {availableElections.length} activas
              </span>
            </div>

            {availableElections.length === 0 ? (
              <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 text-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="text-xl font-medium text-gray-700 mt-4">No hay elecciones activas</h3>
                <p className="text-gray-500 mt-2">Actualmente no hay votaciones disponibles para participar.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {availableElections.map(election => (
                  <div 
                    key={election.id} 
                    className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-[#00ABE4]/20"
                  >
                    <div className="h-3 bg-gradient-to-r from-[#00ABE4] to-[#0096c7]"></div>
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-3">
                        <span className="bg-[#00ABE4]/10 text-[#0077a3] text-xs font-medium px-2.5 py-0.5 rounded">
                          ACTIVA
                        </span>
                        <span className="text-sm text-gray-500">
                          {election.candidates.length} candidatos
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-800 mb-2">{election.title}</h3>
                      <p className="text-gray-600 mb-4">{election.description}</p>
                      
                      <div className="flex items-center text-sm text-gray-500 mb-5">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {formatDate(election.startDate)} - {formatDate(election.endDate)}
                      </div>

                      <Button
                        type="button"
                        onClick={() => navigate(`/vote/${election.id}`)}
                      >
                        Participar ahora
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Próximas elecciones */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mr-2 text-[#00ABE4]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Próximas Elecciones
            </h2>

            {upcomingElections.length === 0 ? (
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <p className="text-gray-500 text-center">No hay elecciones programadas en el futuro cercano.</p>
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-[#00ABE4]/10">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[#0077a3] uppercase tracking-wider">
                        Elección
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[#0077a3] uppercase tracking-wider">
                        Descripción
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[#0077a3] uppercase tracking-wider">
                        Fechas
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[#0077a3] uppercase tracking-wider">
                        Candidatos
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {upcomingElections.map(election => (
                      <tr key={election.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="font-medium text-gray-900">{election.title}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-500 line-clamp-2">{election.description}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">{formatDate(election.startDate)}</div>
                          <div className="text-sm text-gray-500">al {formatDate(election.endDate)}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#00ABE4]/10 text-[#0077a3]">
                            {election.candidates.length} candidatos
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>

          {/* Elecciones pasadas */}
          <section className="mb-10">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mr-2 text-[#0096c7]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Historial de Elecciones
            </h2>

            {pastElections.length === 0 ? (
              <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 text-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                <h3 className="text-xl font-medium text-gray-700 mt-4">Historial vacío</h3>
                <p className="text-gray-500 mt-2">Aún no has participado en ninguna elección.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {pastElections.map(election => (
                  <div 
                    key={election.id} 
                    className="bg-white p-5 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-all duration-300"
                  >
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                      <div className="mb-4 md:mb-0">
                        <h3 className="text-lg font-semibold text-gray-800">{election.title}</h3>
                        <p className="text-gray-600 text-sm mt-1">{election.description}</p>
                        <div className="flex items-center mt-2 text-sm text-gray-500">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          {formatDate(election.startDate)} - {formatDate(election.endDate)}
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          'alreadyVoted' in election && election.alreadyVoted 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-[#00ABE4]/10 text-[#0077a3]'
                        }`}>
                          {'alreadyVoted' in election
                            ? election.alreadyVoted
                              ? 'Votaste'
                              : 'No participaste'
                            : 'Sin registro'}
                        </span>
                        <button 
                          onClick={() => navigate(`/election/${election.id}`)}
                          className="px-4 py-1.5 border border-[#00ABE4] rounded-lg text-sm font-medium text-[#0077a3] hover:bg-[#00ABE4]/10 transition-colors"
                        >
                          Ver resultados
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  )
}