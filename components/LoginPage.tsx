import React, { useState } from 'react'
import { LoginForm } from './LoginForm'
import { RegisterForm } from './RegisterForm'
import { Header } from './Header'
export function LoginPage() {
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login')
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex flex-col w-full">
      <Header />
      <main className="flex flex-1 items-center justify-center px-4 py-8">
        <div className="w-full max-w-md">
          <div className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-xl p-8 transition-all duration-300">
            <div className="flex space-x-2 mb-8">
              <button
                onClick={() => setActiveTab('login')}
                className={`flex-1 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${activeTab === 'login' ? 'bg-blue-600 text-white shadow-md' : 'text-gray-600 hover:bg-gray-100'}`}
              >
                Iniciar Sesión
              </button>
              <button
                onClick={() => setActiveTab('register')}
                className={`flex-1 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${activeTab === 'register' ? 'bg-blue-600 text-white shadow-md' : 'text-gray-600 hover:bg-gray-100'}`}
              >
                Registrarse
              </button>
            </div>
            {activeTab === 'login' ? <LoginForm /> : <RegisterForm />}
          </div>
        </div>
      </main>
      <footer className="py-4 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Sistema Distribuido de Voto Electrónico
      </footer>
    </div>
  )
}
