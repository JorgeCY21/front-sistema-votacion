import React, { useState } from 'react'
import { LoginForm } from './LoginForm'
import { RegisterForm } from './RegisterForm'
import { Header } from './Header'
export function LoginPage() {
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login')
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E9F1FA] via-white to-[#E9F1FA] flex flex-col w-full">
      <Header />
      <main className="flex flex-1 items-center justify-center px-4 py-8">
        <div className="w-full max-w-md">
          <div className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-[0_8px_30px_rgb(0,171,228,0.12)] p-8 transition-all duration-300">
            <div className="flex space-x-2 mb-8">
              <button
                onClick={() => setActiveTab('login')}
                className={`flex-1 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${activeTab === 'login' ? 'bg-gradient-to-r from-[#00ABE4] to-[#0096c7] text-white shadow-md' : 'text-gray-600 hover:bg-[#E9F1FA]'}}`}
              >
                Iniciar Sesión
              </button>
              <button
                onClick={() => setActiveTab('register')}
                className={`flex-1 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${activeTab === 'register' ? 'bg-gradient-to-r from-[#00ABE4] to-[#0096c7] text-white shadow-md' : 'text-gray-600 hover:bg-[#E9F1FA]'}}`}
              >
                Registrarse
              </button>
            </div>
            {activeTab === 'login' ? <LoginForm /> : <RegisterForm />}
          </div>
        </div>
      </main>
      <footer className="py-4 text-center text-sm text-[#00ABE4]">
        © {new Date().getFullYear()} Sistema Distribuido de Voto Electrónico
      </footer>
    </div>
  )
}