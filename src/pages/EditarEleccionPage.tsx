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
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-8">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-6 text-indigo-700">Editar Elección</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Datos generales */}
          <div>
            <label className="block mb-1 font-medium text-gray-700">Título</label>
            <input
              type="text"
              name="title"
              value={election.title}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700">Descripción</label>
            <textarea
              name="description"
              value={election.description}
              onChange={handleChange}
              rows={3}
              className="w-full border border-gray-300 rounded px-3 py-2"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 font-medium text-gray-700">Fecha de inicio</label>
              <input
                type="date"
                name="startDate"
                value={election.startDate}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2"
                required
              />
            </div>

            <div>
              <label className="block mb-1 font-medium text-gray-700">Fecha de fin</label>
              <input
                type="date"
                name="endDate"
                value={election.endDate}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2"
                required
              />
            </div>
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700">Estado</label>
            <select
              name="status"
              value={election.status}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
            >
              <option value="pendiente">Pendiente</option>
              <option value="activo">Activo</option>
              <option value="cerrado">Cerrado</option>
            </select>
          </div>

          {/* Sección de candidatos */}
          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Candidatos</h3>
            {election.candidates.map((candidate, index) => (
              <div
                key={candidate.id}
                className="border border-gray-200 p-4 rounded-lg mb-3 space-y-3 bg-gray-50"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Nombre"
                    value={candidate.name}
                    onChange={e => handleCandidateChange(index, 'name', e.target.value)}
                    className="border border-gray-300 rounded px-3 py-2 w-full"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Partido"
                    value={candidate.party}
                    onChange={e => handleCandidateChange(index, 'party', e.target.value)}
                    className="border border-gray-300 rounded px-3 py-2 w-full"
                    required
                  />
                </div>
                <input
                  type="text"
                  placeholder="URL de la imagen"
                  value={candidate.imageUrl}
                  onChange={e => handleCandidateChange(index, 'imageUrl', e.target.value)}
                  className="border border-gray-300 rounded px-3 py-2 w-full"
                />
                <button
                  type="button"
                  onClick={() => handleDeleteCandidate(index)}
                  className="text-sm text-red-500 hover:underline"
                >
                  Eliminar candidato
                </button>
              </div>
            ))}

            <button
              type="button"
              onClick={handleAddCandidate}
              className="mt-2 px-4 py-2 bg-indigo-100 hover:bg-indigo-200 text-indigo-700 rounded text-sm"
            >
              + Añadir candidato
            </button>
          </div>

          {/* Botones */}
          <div className="flex justify-between pt-4">
            <button
              type="button"
              onClick={() => navigate('/home')}
              className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded"
            >
              Guardar Cambios
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
