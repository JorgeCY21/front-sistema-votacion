import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import type { Candidate, Election } from '../data/electionsData'
import { getElectionsFromStorage, saveElectionsToStorage } from '../utils/storage'
import { v4 as uuidv4 } from 'uuid'
import { Button } from '../components/ui/Button'

export function ManageCandidates() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  const [elections, setElections] = useState<Election[]>([])
  const [election, setElection] = useState<Election>()
  const [candidates, setCandidates] = useState<Candidate[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [form, setForm] = useState<{ id?: string; name: string; party: string; imageUrl: string }>({ name: '', party: '', imageUrl: '' })
  const [formErrors, setFormErrors] = useState<Record<string, string>>({})
  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
    const loadData = async () => {
      try {
        const stored = getElectionsFromStorage()
        setElections(stored)

        if (!id) {
          navigate('/admin')
          return
        }

        const found = stored.find(e => e.id === id)
        if (!found) {
          setError('Elección no encontrada')
          return
        }

        setElection(found)
        setCandidates(found.candidates ?? [])
      } catch (err) {
        setError('Error al cargar los datos')
        console.error(err)
      } finally {
        setIsLoading(false)
      }
    }

    loadData()
  }, [id, navigate])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    if (formErrors[name]) setFormErrors(prev => ({ ...prev, [name]: '' }))
  }

  const resetForm = () => {
    setForm({ name: '', party: '', imageUrl: '' })
    setFormErrors({})
    setIsEditing(false)
  }

  const validateForm = () => {
    const errors: Record<string, string> = {}
    if (!form.name.trim()) errors.name = 'Nombre requerido'
    if (!form.party.trim()) errors.party = 'Partido requerido'
    if (!form.imageUrl.trim()) errors.imageUrl = 'URL requerida'
    else if (!/^https?:\/\/.+/i.test(form.imageUrl)) errors.imageUrl = 'URL no válida'

    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const saveCandidates = (list: Candidate[]) => {
    if (!election) return
    const updated = elections.map(e => e.id === election.id ? { ...e, candidates: list } : e)
    setElections(updated)
    setCandidates(list)
    saveElectionsToStorage(updated)
  }

  const handleSubmit = () => {
    if (!validateForm()) return

    if (isEditing && form.id) {
      const updated = candidates.map(c => c.id === form.id ? { ...c, ...form } : c)
      saveCandidates(updated)
    } else {
      const newCandidate: Candidate = { id: uuidv4(), ...form, votes: 0 }
      saveCandidates([...candidates, newCandidate])
    }

    resetForm()
  }

  const handleDelete = (candidateId: string) => {
    if (confirm('¿Eliminar este candidato?')) {
      saveCandidates(candidates.filter(c => c.id !== candidateId))
    }
  }

  if (isLoading) return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50">
      <div className="text-center">
        <div className="animate-spin h-12 w-12 border-t-2 border-b-2 border-indigo-500 rounded-full mx-auto" />
        <p className="mt-4 text-gray-600">Cargando candidatos...</p>
      </div>
    </div>
  )

  if (error || !election) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="p-6 bg-white rounded-lg shadow-md text-center max-w-md">
        <div className="text-red-500 mb-4">
          <svg className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h2 className="text-xl font-bold text-gray-800">{error || 'Error'}</h2>
        <button onClick={() => navigate('/home')} className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">
          Volver al panel
        </button>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Gestión de Candidatos</h1>
            <p className="text-indigo-600 font-medium">{election.title}</p>
            <p className="text-sm text-gray-500">{election.startDate} - {election.endDate} • {candidates.length} candidatos</p>
          </div>
          <button onClick={() => navigate('/home')} className="px-4 py-2 bg-white border cursor-pointer border-gray-300 rounded hover:bg-gray-50">
            Volver
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Formulario */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-medium text-gray-900 mb-4">{isEditing ? 'Editar' : 'Agregar'} Candidato</h2>
            {['name', 'party', 'imageUrl'].map(field => (
              <div key={field} className="mb-4">
                <label htmlFor={field} className="block text-sm font-medium text-gray-700">
                  {field === 'name' ? 'Nombre completo' : field === 'party' ? 'Partido' : 'URL de la foto'} <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id={field}
                  name={field}
                  value={(form as any)[field]}
                  onChange={handleChange}
                  className={`mt-1 block w-full px-3 py-2 border ${formErrors[field] ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm focus:ring-indigo-500`}
                />
                {formErrors[field] && <p className="text-sm text-red-600">{formErrors[field]}</p>}
              </div>
            ))}
            {form.imageUrl && (
              <div className="flex justify-center my-2">
                <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-gray-200">
                  <img
                    src={form.imageUrl}
                    alt="Vista previa"
                    className="w-full h-full object-cover"
                    onError={e => (e.currentTarget.src = 'https://via.placeholder.com/150?text=Imagen+no+disponible')}
                  />
                </div>
              </div>
            )}
            <div className="flex space-x-2">
              <Button
                type="button"
                onClick={handleSubmit}
                className={`flex-1 ${isEditing ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-green-600 hover:bg-green-700'}`}
              >
                {isEditing ? 'Actualizar' : 'Agregar'}
              </Button>

              {isEditing && (
                <button onClick={resetForm} className="flex-1 px-4 py-2 border cursor-pointer border-gray-300 rounded bg-white hover:bg-gray-50">
                  Cancelar
                </button>
              )}
            </div>
          </div>

          {/* Lista de candidatos */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow">
              {candidates.length === 0 ? (
                <div className="p-8 text-center text-gray-500">
                  <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 10h.01M15 10h.01M12 16h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <h3 className="text-lg font-medium text-gray-900 mt-2">No hay candidatos</h3>
                  <p className="text-sm">Agrega el primero usando el formulario.</p>
                </div>
              ) : (
                <ul className="divide-y divide-gray-200">
                  {candidates.map(c => (
                    <li key={c.id} className="px-4 py-4 hover:bg-gray-50 flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <img src={c.imageUrl} alt={c.name} className="h-16 w-16 rounded-full border object-cover"
                          onError={e => (e.currentTarget.src = 'https://via.placeholder.com/150?text=Imagen+no+disponible')} />
                        <div>
                          <h3 className="text-lg font-medium text-gray-900">{c.name}</h3>
                          <p className="text-sm text-gray-500">{c.party}</p>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <button onClick={() => { setForm(c); setIsEditing(true) }} className="px-3 py-1 cursor-pointer border border-indigo-600 text-indigo-600 rounded hover:bg-indigo-50">
                          Editar
                        </button>
                        <button onClick={() => handleDelete(c.id)} className="px-3 py-1 cursor-pointer border border-red-600 text-red-600 rounded hover:bg-red-50">
                          Eliminar
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
