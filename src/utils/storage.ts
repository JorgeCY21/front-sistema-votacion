import type { Election } from '../data/electionsData'

const STORAGE_KEY = 'my_elections'

export function getElectionsFromStorage(): Election[] {
  const raw = localStorage.getItem(STORAGE_KEY)
  return raw ? JSON.parse(raw) : []
}

export function saveElectionsToStorage(elections: Election[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(elections))
}
