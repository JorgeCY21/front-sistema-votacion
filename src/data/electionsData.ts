export interface Election {
  id: string
  title: string
  description: string
  status: 'active' | 'closed' | 'upcoming'
  alreadyVoted: boolean
  date: string
}

export const electionsData: Election[] = [
  {
    id: '1',
    title: 'Elección de Alcalde 2025',
    description: 'Vota por el próximo alcalde.',
    status: 'active',
    alreadyVoted: false,
    date: '2025-06-10',
  },
  {
    id: '2',
    title: 'Elección Universitaria',
    description: 'Representante estudiantil.',
    status: 'closed',
    alreadyVoted: true,
    date: '2025-05-12',
  },
  {
    id: '3',
    title: 'Consulta Nacional',
    description: 'Participa en la decisión nacional.',
    status: 'upcoming',
    alreadyVoted: false,
    date: '2025-07-01',
  },
]
