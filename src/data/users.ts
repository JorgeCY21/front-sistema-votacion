export interface User {
  email: string
  password: string
  role: 'admin' | 'voter'
}

export const users: User[] = [
  { email: 'user1@example.com', password: '123456', role: 'voter' },
  { email: 'e@e', password: '2', role: 'voter' },
  { email: 'jorgecondoriosy21@gmail.com', password: '12345', role: 'voter' },
  { email: 'a@a', password: '1', role: 'admin' },
]


export function authenticate(email: string, password: string): User | null {
  return users.find(u => u.email === email && u.password === password) ?? null
}
