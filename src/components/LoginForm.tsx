import React, { useState } from 'react'
import { users} from '../data/users'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import {
  UserIcon,
  LockIcon,
  EyeIcon,
  EyeOffIcon,
  LogInIcon,
} from 'lucide-react'

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [error, setError] = useState('')
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const target = e.target as typeof e.target & {
      email: { value: string }
      password: { value: string }
    }
    const email = target.email.value
    const password = target.password.value

    const userFound = users.find(
      (u) => u.email === email && u.password === password
    )

    if (userFound) {
      login(userFound) // Aquí pasa el user completo con rol
      setError('')
      navigate('/home') // redirige a HomePage y cambia pestaña
    } else {
      setError('Correo o contraseña incorrectos')
    }
  }

  return (
    <div className="space-y-6 max-w-md mx-auto">
      <div className="text-center">
        <div className="bg-gradient-to-tr from-[#00ABE4] to-[#0096c7] rounded-full p-3 inline-flex mb-4">
          <LogInIcon className="h-8 w-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">¡Bienvenido!</h2>
        <p className="text-gray-600 mt-1">
          Inicie sesión para acceder al sistema de votación
        </p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-5">
        {error && (
          <p className="text-red-600 text-center font-medium">{error}</p>
        )}
        <div className="space-y-2">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Correo electrónico
          </label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <UserIcon className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
            </div>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              placeholder="usuario@ejemplo.com"
            />
          </div>
        </div>
        <div className="space-y-2">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Contraseña
          </label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <LockIcon className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
            </div>
            <input
              id="password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              required
              className="block w-full pl-10 pr-10 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              placeholder="••••••••"
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOffIcon className="h-5 w-5 text-gray-400 hover:text-gray-600" />
              ) : (
                <EyeIcon className="h-5 w-5 text-gray-400 hover:text-gray-600" />
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
              className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label
              htmlFor="remember-me"
              className="ml-2 block text-sm text-gray-700"
            >
              Recordarme
            </label>
          </div>
          <a
            href="#"
            className="text-sm font-medium text-blue-600 hover:text-blue-500 transition-colors"
          >
            ¿Olvidó su contraseña?
          </a>
        </div>
        <button
          type="submit"
          className="w-full flex justify-center items-center gap-2 py-2.5 px-4 border border-transparent rounded-lg shadow-md text-sm font-medium text-white bg-gradient-to-r from-[#00ABE4] to-[#0096c7] hover:from-[#0096c7] hover:to-[#00ABE4] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00ABE4] transition-all duration-300"
        >
          Iniciar sesión
          <LogInIcon className="h-4 w-4" />
        </button>
      </form>
    </div>
  )
}
