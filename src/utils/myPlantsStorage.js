const STORAGE_KEY = 'flowerplant:my-plants'

export const loadMyPlants = () => {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    if (!stored) return []
    const parsed = JSON.parse(stored)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export const saveMyPlants = (plants) => {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(plants))
}

// Adds a plant to localStorage, preventing duplicates when importing
// from predefined guides (based on `importedFrom`).
export const addPlantToMyPlants = (plant) => {
  const current = loadMyPlants()

  if (plant.importedFrom) {
    const alreadySaved = current.some(
      (p) => p.importedFrom && p.importedFrom === plant.importedFrom,
    )
    if (alreadySaved) {
      return { plants: current, added: false }
    }
  }

  const next = [plant, ...current]
  saveMyPlants(next)
  return { plants: next, added: true }
}

