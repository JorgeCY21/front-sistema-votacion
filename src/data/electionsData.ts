export interface Election {
  id: string
  title: string
  description: string
  fechaInicio: string // formato: 'YYYY-MM-DD'
  fechaFin: string    // formato: 'YYYY-MM-DD'
  status: 'active' | 'closed' | 'upcoming'
  alreadyVoted: boolean
}

// Función para determinar el estado basado en la fecha actual
function calcularEstado(fechaInicio: string, fechaFin: string): 'active' | 'closed' | 'upcoming' {
  const hoy = new Date().toISOString().split('T')[0]

  if (hoy < fechaInicio) return 'upcoming'
  if (hoy > fechaFin) return 'closed'
  return 'active'
}

export const electionsData: Election[] = [
  {
    id: '1',
    title: 'Elección de Alcalde 2025',
    description: 'Vota por el próximo alcalde.',
    fechaInicio: '2025-06-01',
    fechaFin: '2025-06-10',
    status: calcularEstado('2025-06-01', '2025-06-10'),
    alreadyVoted: false,
  },
  {
    id: '2',
    title: 'Elección Universitaria',
    description: 'Representante estudiantil.',
    fechaInicio: '2025-05-01',
    fechaFin: '2025-05-05',
    status: calcularEstado('2025-05-01', '2025-05-05'),
    alreadyVoted: true,
  },
  {
    id: '3',
    title: 'Consulta Nacional',
    description: 'Participa en la decisión nacional.',
    fechaInicio: '2025-07-01',
    fechaFin: '2025-07-07',
    status: calcularEstado('2025-07-01', '2025-07-07'),
    alreadyVoted: false,
  },
]
