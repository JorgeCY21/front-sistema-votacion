import { VoteIcon, ShieldCheckIcon, LogOutIcon } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

export function Header() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout?.()
    navigate('/') // Redirigir al login o página inicial
  }

  return (
    <header className="bg-gradient-to-r from-[#E9F1FA] to-white shadow-sm py-4 px-6">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo y Título */}
        <div className="flex items-center space-x-2">
          <VoteIcon className="h-8 w-8 text-[#00ABE4]" />
          <h1 className="text-xl font-bold text-gray-800 hidden sm:block">
            Sistema de Voto Electrónico
          </h1>
          <h1 className="text-xl font-bold text-gray-800 sm:hidden">SVE</h1>
        </div>

        {/* Información del usuario */}
        <div className="flex flex-col items-end text-right text-[#00ABE4]">
          <div className="flex items-center space-x-1">
            <ShieldCheckIcon className="h-5 w-5" />
            <span className="text-sm font-medium">
              {user ? `Bienvenido, ${user.email}` : 'Seguro'}
            </span>
          </div>

          {user?.role && (
            <span className="text-xs text-gray-500">
              Rol: {user.role === 'admin' ? 'Administrador' : 'Votante'}
            </span>
          )}

          {/* Mostrar solo si el usuario está logueado */}
          {user && (
            <button
              onClick={handleLogout}
              className="mt-2 flex items-center space-x-1 text-red-500 hover:text-red-600 text-sm font-medium"
            >
              <LogOutIcon className="h-4 w-4" />
              <span>Cerrar sesión</span>
            </button>
          )}
        </div>
      </div>
    </header>
  )
}
