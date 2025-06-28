// src/pages/EditarEleccionPage.tsx

import { useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import type { Election } from '../data/electionsData'
import { electionsData } from '../data/electionsData'

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Elección actualizada:', election)
    alert('Cambios guardados (simulado)')
    navigate('/home')
  }

  if (!election) return <div className="p-8">Cargando...</div>

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-8">
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-6 text-indigo-700">Editar Elección</h2>

        <form onSubmit={handleSubmit} className="space-y-5">
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
