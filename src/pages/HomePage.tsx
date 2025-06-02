import { useAuth } from '../context/AuthContext'
import { Header } from '../components/Header'

export function HomePage() {
  const { user, logout } = useAuth()

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header /> {/* Aquí agregamos el Header */}

      <main className="flex-grow w-full max-w-3xl bg-white rounded-lg shadow p-6 mx-auto mt-8">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-blue-600">
            ¡Hola, {user}!
          </h1>
        </header>

        <section className="mb-6 text-gray-700">
          <p>Bienvenido al sistema de votación electrónica.</p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-3">Opciones disponibles</h2>
          <ul className="list-disc list-inside text-gray-600 space-y-1">
            <li>Ver candidatos disponibles</li>
            <li>Emitir voto</li>
            <li>Consultar resultados preliminares</li>
            <li>Configuración de perfil</li>
          </ul>
        </section>

        <button
          onClick={logout}
          className="mt-4 bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded transition"
        >
          Cerrar sesión
        </button>
      </main>
    </div>
  )
}
