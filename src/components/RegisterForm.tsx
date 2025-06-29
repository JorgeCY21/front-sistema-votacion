import React, { useState } from 'react'
import { UserIcon, LockIcon, EyeIcon, EyeOffIcon, UserPlusIcon, MailIcon, } from 'lucide-react'
import { Button } from './ui/Button'
import { Label } from './ui/Label'
import { Input } from './ui/Input'

export function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Register attempt')
  }
  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="bg-gradient-to-tr from-[#00ABE4] to-[#0096c7] rounded-full p-3 inline-flex mb-4">
          <UserPlusIcon className="h-8 w-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">Crear cuenta</h2>
        <p className="text-gray-600 mt-1">
          Complete el formulario para registrarse
        </p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="name" required> Nombre completo </Label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <UserIcon className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
            </div>
            <Input id="name" name="name" type="text" required className="pl-10 pr-3" placeholder="Juan Pérez"/>
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="register-email" required> Correo electrónico </Label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MailIcon className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
            </div>
            <Input id="register-email" name="email" type="email" required placeholder="usuario@ejemplo.com" className="pl-10 pr-3" /> 
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="register-password" required> Contraseña </Label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <LockIcon className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
            </div>
           <Input id="register-password" name="password" type={showPassword ? 'text' : 'password'} required placeholder="••••••••" className="pl-10 pr-10" />
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
        <div className="space-y-2">
          <Label htmlFor="confirm-password" required> Confirmar contraseña </Label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <LockIcon className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
            </div>
            <Input id="confirm-password" name="confirm-password" type={showConfirmPassword ? 'text' : 'password'} required placeholder="••••••••" className="pl-10 pr-10" />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? (
                <EyeOffIcon className="h-5 w-5 text-gray-400 hover:text-gray-600" />
              ) : (
                <EyeIcon className="h-5 w-5 text-gray-400 hover:text-gray-600" />
              )}
            </button>
          </div>
        </div>
        <div className="flex items-start">
          <div className="flex items-center h-5">
            <input id="terms" name="terms" type="checkbox" required className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
          </div>
          <div className="ml-2">
            <label htmlFor="terms" className="text-sm text-gray-700">
              Acepto los{' '}
              <a
                href="#"
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                términos y condiciones
              </a>
            </label>
          </div>
        </div>
        <Button type="submit">
          Registrarse
          <UserPlusIcon className="h-4 w-4" />
        </Button>
      </form>
    </div>
  )
}
