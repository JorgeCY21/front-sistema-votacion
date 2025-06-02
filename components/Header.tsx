import { VoteIcon, ShieldCheckIcon } from 'lucide-react'
export function Header() {
  return (
    <header className="bg-white shadow-sm py-4 px-6">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <VoteIcon className="h-8 w-8 text-blue-600" />
          <h1 className="text-xl font-bold text-gray-800 hidden sm:block">
            Sistema de Voto Electrónico
          </h1>
          <h1 className="text-xl font-bold text-gray-800 sm:hidden">SVE</h1>
        </div>
        <div className="flex items-center text-blue-600">
          <ShieldCheckIcon className="h-5 w-5 mr-1" />
          <span className="text-sm font-medium">Seguro</span>
        </div>
      </div>
    </header>
  )
}
