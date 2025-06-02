import { LoginForm } from './LoginForm'
import { Header } from './Header'
export function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col w-full">
      <Header />
      <main className="flex flex-1 items-center justify-center px-4 py-8">
        <div className="w-full max-w-md">
          <LoginForm />
        </div>
      </main>
      <footer className="py-4 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Sistema Distribuido de Voto Electrónico
      </footer>
    </div>
  )
}
