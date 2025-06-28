// electionsData.ts
export interface Candidate {
  id: string
  name: string
  party: string
  imageUrl: string
  votes?: number // Contador de votos
}

export interface Election {
  id: string
  title: string
  description: string
  startDate: string
  endDate: string
  status: 'pendiente' | 'activo' | 'cerrado'
  candidates: Candidate[]
  voters?: number // Añadimos esta propiedad como opcional
  totalVoters?: number // Total de votantes habilitados
  votesCount?: number // Total de votos realizados
  createdAt?: string
  createdBy?: string
}

export const electionsData: Election[] = [
  {
    id: '1',
    title: 'Elección de Alcalde 2025',
    description: 'Vota por el próximo alcalde de la ciudad',
    startDate: '2025-06-10',
    endDate: '2025-06-15',
    status: 'activo',
    voters: 1250, // Añadimos este valor
    totalVoters: 1500,
    votesCount: 850,
    createdAt: '2025-05-01',
    createdBy: '1',
    candidates: [
      {
        id: 'c1',
        name: 'Juan Pérez',
        party: 'Partido Azul',
        imageUrl: 'https://example.com/juan.jpg',
        votes: 450
      },
      {
        id: 'c2',
        name: 'María López',
        party: 'Partido Verde',
        imageUrl: 'https://example.com/maria.jpg',
        votes: 400
      }
    ]
  },
  // ... otras elecciones
]

// Función auxiliar para obtener elecciones por estado
export function getElectionsByStatus(status: Election['status']): Election[] {
  return electionsData.filter(e => e.status === status)
}