// src/data/electionsData.ts

export interface Candidate {
  id: string
  name: string
  party: string
  imageUrl: string
}

export interface Election {
  id: string
  title: string
  description: string
  startDate: string
  endDate: string
  status: 'pendiente' | 'activo' | 'cerrado'
  candidates: Candidate[]
}

export const electionsData: Election[] = [
  {
    id: '1',
    title: 'Elección de Alcalde 2025',
    description: 'Vota por el próximo alcalde.',
    startDate: '2025-06-10',
    endDate: '2025-06-15',
    status: 'activo',
    candidates: [
      {
        id: 'c1',
        name: 'Juan Pérez',
        party: 'Partido Azul',
        imageUrl: 'https://example.com/juan.jpg',
      },
      {
        id: 'c2',
        name: 'María López',
        party: 'Partido Verde',
        imageUrl: 'https://example.com/maria.jpg',
      }
    ]
  },
]
