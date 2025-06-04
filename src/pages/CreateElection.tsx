import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
import type { Election } from '../data/electionsData'
import { getElectionsFromStorage, saveElectionsToStorage } from '../utils/storage'

export function CreateElection() {
  const navigate = useNavigate()

  const [form, setForm] = useState({
    title: '',
    description: '',
    startDate: '',
    endDate: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const computeStatus = (start: string, end: string): Election['status'] => {
    const now = new Date()
    if (now < new Date(start)) return 'pendiente'
    if (now > new Date(end)) return 'cerrado'
    return 'activo'
  }

  const handleSubmit = () => {
    if (!form.title || !form.startDate || !form.endDate) {
      alert('Completa todos los campos obligatorios')
      return
    }
    const newElection: Election = {
      id: uuidv4(),
      title: form.title,
      description: form.description,
      startDate: form.startDate,
      endDate: form.endDate,
      status: computeStatus(form.startDate, form.endDate),
      candidates: [],
    }

    const elections = getElectionsFromStorage()
    elections.push(newElection)
    saveElectionsToStorage(elections)

    navigate(`/manage-candidates/${newElection.id}`)
  }

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Crear Elección</h1>
      <input
        type="text"
        name="title"
        placeholder="Título"
        value={form.title}
        onChange={handleChange}
        className="w-full p-2 border mb-2 rounded"
      />
      <textarea
        name="description"
        placeholder="Descripción (opcional)"
        value={form.description}
        onChange={handleChange}
        className="w-full p-2 border mb-2 rounded"
      />
      <label>Fecha de inicio</label>
      <input
        type="date"
        name="startDate"
        value={form.startDate}
        onChange={handleChange}
        className="w-full p-2 border mb-2 rounded"
      />
      <label>Fecha de fin</label>
      <input
        type="date"
        name="endDate"
        value={form.endDate}
        onChange={handleChange}
        className="w-full p-2 border mb-2 rounded"
      />

      <button
        onClick={handleSubmit}
        className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
      >
        Crear y agregar candidatos
      </button>
    </div>
  )
}
