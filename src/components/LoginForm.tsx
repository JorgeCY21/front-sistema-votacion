import React, { useState } from 'react'
import { users } from '../data/users'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import {UserIcon, LockIcon, EyeIcon, EyeOffIcon, LogInIcon,} from 'lucide-react'
import { Label } from './ui/Label'
import { Input } from './ui/Input'
import { Button } from './ui/Button'

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
      login(userFound)
      setError('')
      navigate('/home')
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
        {error && <p className="text-red-600 text-center font-medium">{error}</p>}

        <div className="space-y-2">
          <Label htmlFor="email" required>Correo electrónico</Label>
          <div className="relative">
            <UserIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input id="email" name="email" type="email" required placeholder="usuario@ejemplo.com" className="pl-10"/>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="password" required>Contraseña</Label>
          <div className="relative">
            <LockIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input id="password" name="password" type={showPassword ? 'text' : 'password'} required placeholder="••••••••" className="pl-10 pr-10"/>
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2"
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
          <div className="flex items-center space-x-2">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
              className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <Label htmlFor="remember-me">Recordarme</Label>
          </div>
          <a
            href="#"
            className="text-sm font-medium text-blue-600 hover:text-blue-500"
          >
            ¿Olvidó su contraseña?
          </a>
        </div>

        <Button type="submit" className="w-full">
          Iniciar sesión
          <LogInIcon className="h-4 w-4" />
        </Button>
      </form>
    </div>
  )
}
