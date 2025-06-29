// src/pages/EditarEleccionPage.tsx

import { useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import type { Election, Candidate } from '../data/electionsData'
import { electionsData } from '../data/electionsData'
import { v4 as uuidv4 } from 'uuid'

export function EditarEleccionPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [election, setElection] = useState<Election | null>(null)

  useEffect(() => {
    const found = electionsData.find(e => e.id === id)
    if (found) setElection(found)
    else alert('Elección no encontrada')
  }, [id])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    if (!election) return
    setElection({ ...election, [e.target.name]: e.target.value })
  }

  const handleCandidateChange = (index: number, field: keyof Candidate, value: string) => {
    if (!election) return
    const updatedCandidates = [...election.candidates]
    updatedCandidates[index] = { ...updatedCandidates[index], [field]: value }
    setElection({ ...election, candidates: updatedCandidates })
  }

  const handleAddCandidate = () => {
    if (!election) return
    const newCandidate: Candidate = {
      id: uuidv4(),
      name: '',
      party: '',
      imageUrl: '',
      votes: 0
    }
    setElection({ ...election, candidates: [...election.candidates, newCandidate] })
  }

  const handleDeleteCandidate = (index: number) => {
    if (!election) return
    const updated = [...election.candidates]
    updated.splice(index, 1)
    setElection({ ...election, candidates: updated })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Elección actualizada:', election)
    alert('Cambios guardados (simulado)')
    navigate('/home')
  }

  if (!election) return <div className="p-8">Cargando...</div>

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-50 py-10 px-4 sm:px-8">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-lg">
        <div className="flex items-center mb-6">
          <button 
            onClick={() => navigate('/home')}
            className="mr-4 p-2 rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </button>
          <h2 className="text-3xl font-bold text-gray-800">Editar Elección</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Datos generales */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">Información General</h3>
            
            <div className="space-y-5">
              <div>
                <label className="block mb-2 font-medium text-gray-700">Título</label>
                <input
                  type="text"
                  name="title"
                  value={election.title}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                  required
                />
              </div>

              <div>
                <label className="block mb-2 font-medium text-gray-700">Descripción</label>
                <textarea
                  name="description"
                  value={election.description}
                  onChange={handleChange}
                  rows={3}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block mb-2 font-medium text-gray-700">Fecha de inicio</label>
                  <input
                    type="date"
                    name="startDate"
                    value={election.startDate}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                    required
                  />
                </div>

                <div>
                  <label className="block mb-2 font-medium text-gray-700">Fecha de fin</label>
                  <input
                    type="date"
                    name="endDate"
                    value={election.endDate}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block mb-2 font-medium text-gray-700">Estado</label>
                <select
                  name="status"
                  value={election.status}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                >
                  <option value="pendiente">Pendiente</option>
                  <option value="activo">Activo</option>
                  <option value="cerrado">Cerrado</option>
                </select>
              </div>
            </div>
          </div>

          {/* Sección de candidatos */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-gray-700">Candidatos</h3>
              <button
                type="button"
                onClick={handleAddCandidate}
                className="flex items-center px-4 py-2 bg-gradient-to-r from-[#00ABE4] to-[#0096c7] hover:from-[#0096c7] hover:to-[#00ABE4]  text-white rounded-lg transition-colors cursor-pointer"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
                Añadir Candidato
              </button>
            </div>

            <div className="space-y-4">
              {election.candidates.map((candidate, index) => (
                <div
                  key={candidate.id}
                  className="border border-gray-200 p-5 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                >
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    <div className="md:col-span-2 space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block mb-1 text-sm font-medium text-gray-600">Nombre</label>
                          <input
                            type="text"
                            placeholder="Nombre completo"
                            value={candidate.name}
                            onChange={e => handleCandidateChange(index, 'name', e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                            required
                          />
                        </div>
                        <div>
                          <label className="block mb-1 text-sm font-medium text-gray-600">Partido</label>
                          <input
                            type="text"
                            placeholder="Partido político"
                            value={candidate.party}
                            onChange={e => handleCandidateChange(index, 'party', e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block mb-1 text-sm font-medium text-gray-600">URL de la imagen</label>
                        <input
                          type="text"
                          placeholder="https://ejemplo.com/imagen.jpg"
                          value={candidate.imageUrl}
                          onChange={e => handleCandidateChange(index, 'imageUrl', e.target.value)}
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col items-center">
                      <div className="w-full h-40 bg-gray-200 rounded-lg overflow-hidden mb-2 flex items-center justify-center">
                        {candidate.imageUrl ? (
                          <img 
                            src={candidate.imageUrl} 
                            alt="Previsualización" 
                            className="object-cover w-full h-full"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.src = 'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22200%22%20height%3D%22200%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20200%20200%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_18a5d6c5d5a%20text%20%7B%20fill%3A%23AAAAAA%3Bfont-weight%3Abold%3Bfont-family%3AArial%2C%20Helvetica%2C%20Open%20Sans%2C%20sans-serif%2C%20monospace%3Bfont-size%3A10pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_18a5d6c5d5a%22%3E%3Crect%20width%3D%22200%22%20height%3D%22200%22%20fill%3D%22%23EEEEEE%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%2274.421875%22%20y%3D%22104.5%22%3E200x200%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E'
                            }}
                          />
                        ) : (
                          <div className="text-gray-400 text-center p-4">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <p className="text-sm mt-2">Previsualización de imagen</p>
                          </div>
                        )}
                      </div>
                      <button
                        type="button"
                        onClick={() => handleDeleteCandidate(index)}
                        className="mt-2 px-3 py-1 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg text-sm transition-colors flex items-center cursor-pointer"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        Eliminar
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Botones */}
          <div className="flex justify-end space-x-4 pt-6">
            <button
              type="button"
              onClick={() => navigate('/home')}
              className="px-6 py-3 bg-gray-200 hover:bg-gray-300 rounded-lg font-medium transition-colors cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-gradient-to-r from-[#00ABE4] to-[#0096c7] hover:from-[#0096c7] hover:to-[#00ABE4]  text-white rounded-lg font-medium transition-colors shadow-md hover:shadow-lg cursor-pointer"
            >
              Guardar Cambios
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}