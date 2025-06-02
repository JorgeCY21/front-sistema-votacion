import React, { useState } from 'react'
import {
  UserIcon,
  LockIcon,
  EyeIcon,
  EyeOffIcon,
  ShieldCheckIcon,
} from 'lucide-react'
export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically handle authentication
    console.log('Login attempt')
  }
  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      <div className="text-center mb-8">
        <div className="bg-blue-100 rounded-full p-3 inline-flex mb-4">
          <ShieldCheckIcon className="h-10 w-10 text-blue-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800">Bienvenido</h2>
        <p className="text-gray-600 mt-1">
          Inicie sesión para acceder al sistema de votación
        </p>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="space-y-5">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Correo electrónico
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <UserIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="usuario@ejemplo.com"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Contraseña
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <LockIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                required
                className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="••••••••"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOffIcon className="h-5 w-5 text-gray-400" />
                ) : (
                  <EyeIcon className="h-5 w-5 text-gray-400" />
                )}
              </button>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
                className="h-4 w-4 text-blue-600 border-gray-300 rounded"
              />
              <label
                htmlFor="remember-me"
                className="ml-2 block text-sm text-gray-700"
              >
                Recordarme
              </label>
            </div>
            <div className="text-sm">
              <a
                href="#"
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                ¿Olvidó su contraseña?
              </a>
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Iniciar sesión
            </button>
          </div>
        </div>
      </form>
      <div className="mt-6 border-t border-gray-200 pt-4">
        <div className="text-center text-sm">
          <span className="text-gray-600">¿No tiene una cuenta? </span>
          <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
            Contacte al administrador
          </a>
        </div>
      </div>
    </div>
  )
}
