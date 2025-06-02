import { VoteIcon, ShieldCheckIcon } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

export function Header() {
  const { user } = useAuth()

  return (
    <header className="bg-gradient-to-r from-[#E9F1FA] to-white shadow-sm py-4 px-6">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <VoteIcon className="h-8 w-8 text-[#00ABE4]" />
          <h1 className="text-xl font-bold text-gray-800 hidden sm:block">
            Sistema de Voto Electrónico
          </h1>
          <h1 className="text-xl font-bold text-gray-800 sm:hidden">SVE</h1>
        </div>
        <div className="flex flex-col items-end text-right text-[#00ABE4]">
          <div className="flex items-center space-x-1">
            <ShieldCheckIcon className="h-5 w-5" />
            {user ? (
              <span className="text-sm font-medium">Bienvenido, {user.email}</span>
            ) : (
              <span className="text-sm font-medium">Seguro</span>
            )}
          </div>
          {user?.role && (
            <span className="text-xs text-gray-500">
              Rol: {user.role === 'admin' ? 'Administrador' : 'Votante'}
            </span>
          )}
        </div>
      </div>
    </header>
  )
}
