import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
import type { Election } from '../data/electionsData'

export function CreateElection({ onCreate }: { onCreate?: (election: Election) => void }) {
  const [form, setForm] = useState<{
    title: string
    description: string
    fechaInicio: string
    fechaFin: string
    alreadyVoted: boolean
  }>({
    title: '',
    description: '',
    fechaInicio: '',
    fechaFin: '',
    alreadyVoted: false
  })

  const navigate = useNavigate()

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target
    const val =
      type === 'checkbox'
        ? (e.target as HTMLInputElement).checked
        : value

    setForm(prev => ({ ...prev, [name]: val }))
  }

  const calcularEstado = (inicio: string, fin: string): 'upcoming' | 'active' | 'closed' => {
    const hoy = new Date()
    const inicioDate = new Date(inicio)
    const finDate = new Date(fin)

    if (hoy < inicioDate) return 'upcoming'
    if (hoy >= inicioDate && hoy <= finDate) return 'active'
    return 'closed'
  }

const handleSubmit = () => {
  const status = calcularEstado(form.fechaInicio, form.fechaFin)

  const newElection: Election = {
    id: uuidv4(),
    title: form.title,
    description: form.description,
    fechaInicio: form.fechaInicio,
    fechaFin: form.fechaFin,
    status,
    alreadyVoted: form.alreadyVoted
  }

  if (onCreate) {
    onCreate(newElection)
  }

  navigate('/home')
}


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-blue-700">Crear Nueva Elección</h1>

        <input
          name="title"
          type="text"
          placeholder="Título"
          value={form.title}
          onChange={handleChange}
          className="w-full mb-3 p-2 border rounded"
        />

        <textarea
          name="description"
          placeholder="Descripción"
          value={form.description}
          onChange={handleChange}
          className="w-full mb-3 p-2 border rounded"
        />

        <label className="text-sm font-semibold block mb-1">Fecha de inicio</label>
        <input
          name="fechaInicio"
          type="date"
          value={form.fechaInicio}
          onChange={handleChange}
          className="w-full mb-3 p-2 border rounded"
        />

        <label className="text-sm font-semibold block mb-1">Fecha de fin</label>
        <input
          name="fechaFin"
          type="date"
          value={form.fechaFin}
          onChange={handleChange}
          className="w-full mb-3 p-2 border rounded"
        />

        <label className="flex items-center mb-4">
          <input
            name="alreadyVoted"
            type="checkbox"
            checked={form.alreadyVoted}
            onChange={handleChange}
            className="mr-2"
          />
          Ya se votó
        </label>

        <div className="flex justify-end gap-2">
          <button
            onClick={() => navigate('/home')}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Cancelar
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Crear
          </button>
        </div>
      </div>
    </div>
  )
}
