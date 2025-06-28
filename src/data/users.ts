// users.ts

export interface User {
  id: string
  email: string
  password: string
  first_name: string
  last_name: string
  role: 'admin' | 'voter'
  dni?: string
  votedElections?: string[] // IDs de elecciones en las que ya votó
}

export const users: User[] = [
  { 
    id: '1',
    email: 'a@a', 
    password: '1', 
    first_name: 'Administrador',
    last_name: 'Principal',
    role: 'admin' 
  },
  { 
    id: '2',
    email: 'e@e', 
    password: '2', 
    first_name: 'Usuario',
    last_name: 'Votante 1',
    role: 'voter',
    dni: '12345678A'
  },
  { 
    id: '3',
    email: 'jorgecondoriosy21@gmail.com', 
    password: '12345', 
    first_name: 'Jorge',
    last_name: 'Condori',
    role: 'voter',
    dni: '87654321B'
  },
]

export function authenticate(email: string, password: string): User | null {
  return users.find(u => u.email === email && u.password === password) ?? null
}

export function getUserById(id: string): User | null {
  return users.find(u => u.id === id) ?? null
}
