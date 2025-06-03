// src/pages/ManageCandidates.tsx
import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import type { Election, Candidate } from '../data/electionsData'
import { electionsData } from '../data/electionsData'
import { v4 as uuidv4 } from 'uuid'

export function ManageCandidates() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  const [election, setElection] = useState<Election | undefined>(undefined)
  const [candidates, setCandidates] = useState<Candidate[]>([])

  // Form para nuevo/editar candidato
  const [form, setForm] = useState<{ id?: string; name: string; party: string; imageUrl: string }>({
    name: '',
    party: '',
    imageUrl: '',
  })

  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
    const found = electionsData.find(e => e.id === id)
    if (!found) {
      alert('Elección no encontrada')
      navigate('/home')
      return
    }
    setElection(found)
    setCandidates(found.candidates)
  }, [id, navigate])

  const resetForm = () => {
    setForm({ name: '', party: '', imageUrl: '' })
    setIsEditing(false)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleAdd = () => {
    if (!form.name || !form.party || !form.imageUrl) {
      alert('Completa todos los campos')
      return
    }
    const newCandidate: Candidate = {
      id: uuidv4(),
      name: form.name,
      party: form.party,
      imageUrl: form.imageUrl,
    }
    setCandidates(prev => [...prev, newCandidate])
    resetForm()
  }

  const handleEdit = (candidate: Candidate) => {
    setForm(candidate)
    setIsEditing(true)
  }

  const handleUpdate = () => {
    if (!form.id || !form.name || !form.party || !form.imageUrl) {
      alert('Completa todos los campos')
      return
    }
    setCandidates(prev =>
      prev.map(c => (c.id === form.id ? { ...c, name: form.name, party: form.party, imageUrl: form.imageUrl } : c))
    )
    resetForm()
  }

  const handleDelete = (candidateId: string) => {
    if (confirm('¿Eliminar candidato?')) {
      setCandidates(prev => prev.filter(c => c.id !== candidateId))
    }
  }

  // Ojo: aquí deberías sincronizar candidates con la data global o backend,
  // por ahora solo está local

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-2xl font-bold mb-6 text-blue-700">
        Gestionar candidatos - {election?.title}
      </h1>

      <div className="mb-6 max-w-md">
        <input
          type="text"
          name="name"
          placeholder="Nombre del candidato"
          value={form.name}
          onChange={handleChange}
          className="w-full mb-2 p-2 border rounded"
        />
        <input
          type="text"
          name="party"
          placeholder="Partido"
          value={form.party}
          onChange={handleChange}
          className="w-full mb-2 p-2 border rounded"
        />
        <input
          type="text"
          name="imageUrl"
          placeholder="URL de la imagen"
          value={form.imageUrl}
          onChange={handleChange}
          className="w-full mb-2 p-2 border rounded"
        />
        {isEditing ? (
          <div className="flex gap-2">
            <button
              onClick={handleUpdate}
              className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
            >
              Actualizar
            </button>
            <button
              onClick={resetForm}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            >
              Cancelar
            </button>
          </div>
        ) : (
          <button
            onClick={handleAdd}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Agregar candidato
          </button>
        )}
      </div>

      <ul className="space-y-4 max-w-md">
        {candidates.map(c => (
          <li key={c.id} className="bg-white p-4 rounded shadow flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <img src={c.imageUrl} alt={c.name} className="w-12 h-12 rounded-full object-cover" />
              <div>
                <p className="font-semibold">{c.name}</p>
                <p className="text-sm text-gray-600">{c.party}</p>
              </div>
            </div>
            <div className="space-x-2">
              <button
                onClick={() => handleEdit(c)}
                className="px-3 py-1 bg-yellow-400 hover:bg-yellow-500 text-gray-900 rounded"
              >
                Editar
              </button>
              <button
                onClick={() => handleDelete(c.id)}
                className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded"
              >
                Eliminar
              </button>
            </div>
          </li>
        ))}
      </ul>

      <button
        onClick={() => navigate('/home')}
        className="mt-8 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Volver al panel
      </button>
    </div>
  )
}
