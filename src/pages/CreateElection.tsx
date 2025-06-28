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
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    
    if (!form.title.trim()) newErrors.title = 'El título es requerido'
    if (!form.startDate) newErrors.startDate = 'La fecha de inicio es requerida'
    if (!form.endDate) newErrors.endDate = 'La fecha de fin es requerida'
    
    if (form.startDate && form.endDate && new Date(form.startDate) > new Date(form.endDate)) {
      newErrors.endDate = 'La fecha de fin debe ser posterior a la fecha de inicio'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const computeStatus = (start: string, end: string): Election['status'] => {
    const now = new Date()
    if (now < new Date(start)) return 'pendiente'
    if (now > new Date(end)) return 'cerrado'
    return 'activo'
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    setIsSubmitting(true)

    const newElection: Election = {
      id: uuidv4(),
      title: form.title,
      description: form.description,
      startDate: form.startDate,
      endDate: form.endDate,
      status: computeStatus(form.startDate, form.endDate),
      candidates: [],
      totalVoters: 0,
      votesCount: 0,
      createdAt: new Date().toISOString(),
      createdBy: 'current-user-id' // Reemplazar con ID del usuario real
    }

    try {
      const elections = getElectionsFromStorage()
      elections.push(newElection)
      saveElectionsToStorage(elections)
      
      navigate(`/manage-candidates/${newElection.id}`, {
        state: { message: 'Elección creada exitosamente' }
      })
    } catch (error) {
      console.error('Error al guardar la elección:', error)
      alert('Ocurrió un error al guardar la elección')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900">Crear Nueva Elección</h1>
          <p className="mt-2 text-lg text-gray-600">
            Completa los detalles de la elección y luego podrás agregar candidatos
          </p>
        </div>

        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
          <div className="p-6 sm:p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                  Título de la elección <span className="text-red-500">*</span>
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    className={`block w-full px-4 py-3 rounded-md border ${errors.title ? 'border-red-300' : 'border-gray-300'} shadow-sm focus:ring-indigo-500 focus:border-indigo-500`}
                    placeholder="Ej: Elecciones Presidenciales 2023"
                  />
                  {errors.title && (
                    <p className="mt-1 text-sm text-red-600">{errors.title}</p>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                  Descripción
                </label>
                <div className="mt-1">
                  <textarea
                    id="description"
                    name="description"
                    rows={4}
                    value={form.description}
                    onChange={handleChange}
                    className="block w-full px-4 py-3 rounded-md border border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Proporciona una descripción detallada de esta elección..."
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">
                    Fecha de inicio <span className="text-red-500">*</span>
                  </label>
                  <div className="mt-1">
                    <input
                      type="date"
                      id="startDate"
                      name="startDate"
                      value={form.startDate}
                      onChange={handleChange}
                      min={new Date().toISOString().split('T')[0]}
                      className={`block w-full px-4 py-3 rounded-md border ${errors.startDate ? 'border-red-300' : 'border-gray-300'} shadow-sm focus:ring-indigo-500 focus:border-indigo-500`}
                    />
                    {errors.startDate && (
                      <p className="mt-1 text-sm text-red-600">{errors.startDate}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">
                    Fecha de fin <span className="text-red-500">*</span>
                  </label>
                  <div className="mt-1">
                    <input
                      type="date"
                      id="endDate"
                      name="endDate"
                      value={form.endDate}
                      onChange={handleChange}
                      min={form.startDate || new Date().toISOString().split('T')[0]}
                      className={`block w-full px-4 py-3 rounded-md border ${errors.endDate ? 'border-red-300' : 'border-gray-300'} shadow-sm focus:ring-indigo-500 focus:border-indigo-500`}
                    />
                    {errors.endDate && (
                      <p className="mt-1 text-sm text-red-600">{errors.endDate}</p>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => navigate(-1)}
                  className="px-6 py-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`px-6 py-3 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${isSubmitting ? 'opacity-75 cursor-not-allowed' : ''}`}
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Creando...
                    </>
                  ) : (
                    'Crear y agregar candidatos'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="mt-8 bg-blue-50 border-l-4 border-blue-400 p-4 rounded">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-blue-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-blue-800">Consejos para crear una buena elección</h3>
              <div className="mt-2 text-sm text-blue-700">
                <ul className="list-disc pl-5 space-y-1">
                  <li>Usa un título claro y descriptivo</li>
                  <li>Asegúrate de que las fechas sean realistas</li>
                  <li>Proporciona una descripción detallada para los votantes</li>
                  <li>Revisa cuidadosamente antes de crear la elección</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}