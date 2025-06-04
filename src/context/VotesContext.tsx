import { createContext, useContext, useEffect, useState } from 'react'
import type { ReactNode } from 'react'

interface VotesContextType {
  userVotes: Record<string, boolean>
  setUserVoted: (electionId: string) => void
}

const VotesContext = createContext<VotesContextType | undefined>(undefined)

export const VotesProvider = ({ children }: { children: ReactNode }) => {
  const [userVotes, setUserVotes] = useState<Record<string, boolean>>(() => {
    const stored = localStorage.getItem('userVotes')
    return stored ? JSON.parse(stored) : {}
  })

  const setUserVoted = (electionId: string) => {
    setUserVotes(prev => {
      const updated = { ...prev, [electionId]: true }
      localStorage.setItem('userVotes', JSON.stringify(updated))
      return updated
    })
  }

  useEffect(() => {
    // sincroniza en caso se modifique de otra pestaña
    const handleStorage = (event: StorageEvent) => {
      if (event.key === 'userVotes' && event.newValue) {
        setUserVotes(JSON.parse(event.newValue))
      }
    }

    window.addEventListener('storage', handleStorage)
    return () => window.removeEventListener('storage', handleStorage)
  }, [])

  return (
    <VotesContext.Provider value={{ userVotes, setUserVoted }}>
      {children}
    </VotesContext.Provider>
  )
}

export const useVotes = (): VotesContextType => {
  const context = useContext(VotesContext)
  if (!context) {
    throw new Error('useVotes must be used within a VotesProvider')
  }
  return context
}
