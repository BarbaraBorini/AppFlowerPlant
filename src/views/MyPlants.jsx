import { useEffect, useState } from 'react'
import PlantCard from '../components/PlantCard.jsx'
import PlantForm from '../components/PlantForm.jsx'
import FilterBar from '../components/FilterBar.jsx'
import Toast from '../components/Toast.jsx'
import { loadMyPlants, saveMyPlants } from '../utils/myPlantsStorage.js'

// Main CRUD view for the personal collection.
const MyPlants = () => {
  // Initialise state from localStorage only once.
  const [plants, setPlants] = useState(() => loadMyPlants())
  const [editingId, setEditingId] = useState(null)
  const [search, setSearch] = useState('')
  const [levelFilter, setLevelFilter] = useState('all')
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [toastMessage, setToastMessage] = useState('')

  // Whenever the plants array changes, write it back to localStorage.
  useEffect(() => {
    saveMyPlants(plants)
  }, [plants])

  // Create a new plant or update the one currently being edited.
  const handleSave = (plant) => {
    const isEditing = Boolean(editingId)
    if (editingId) {
      // Update existing plant by id.
      setPlants((prev) =>
        prev.map((item) =>
          item.id === editingId
            ? {
                ...plant,
                id: editingId,
                importedFrom: item.importedFrom || undefined,
              }
            : item,
        ),
      )
      setEditingId(null)
    } else {
      // Add a new plant with a generated unique id.
      const newPlant = {
        ...plant,
        id: crypto.randomUUID(),
      }
      setPlants((prev) => [newPlant, ...prev])
    }
    // Close the popup after saving (works for both add and edit).
    setIsFormOpen(false)
    setEditingId(null)

    // Show confirmation message.
    setToastMessage(
      isEditing
        ? `Updated "${plant.commonName || 'plant'}" in My Plants.`
        : `Added "${plant.commonName || 'plant'}" to My Plants.`,
    )
  }

  const handleEdit = (id) => {
    setEditingId(id)
    setIsFormOpen(true)
  }

  const handleDelete = (id) => {
    const confirmed = window.confirm('Remove this plant from your collection?')
    if (!confirmed) return
    setPlants((prev) => prev.filter((plant) => plant.id !== id))
    // If we were editing this plant, cancel edit mode.
    if (editingId === id) {
      setEditingId(null)
    }
  }

  // Look up the full plant data for the one we are editing.
  const editingPlant = plants.find((plant) => plant.id === editingId) || null

  const [filteredPlants, setFilteredPlants] = useState(() => loadMyPlants())

  // Update the visible list when plants, search or level filter change.
  useEffect(() => {
    const filtered = plants.filter((plant) => {
      const matchesSearch =
        plant.commonName.toLowerCase().includes(search.toLowerCase()) ||
        (plant.scientificName || '')
          .toLowerCase()
          .includes(search.toLowerCase())

      const matchesLevel =
        levelFilter === 'all' || plant.difficulty === levelFilter

      return matchesSearch && matchesLevel
    })
    setFilteredPlants(filtered)
  }, [plants, search, levelFilter])

  return (
    <div className="page page-my-plants">
      <Toast message={toastMessage} onClose={() => setToastMessage('')} />

      <section className="section">
        <header className="section-header">
          <h2 className="section-heading">My Plants</h2>
          <p className="section-subtitle">
            Save your own plant care guides, keep track of light and watering needs, and update them as your plants grow.
          </p>
        </header>

        <FilterBar
          search={search}
          level={levelFilter}
          onSearchChange={setSearch}
          onLevelChange={setLevelFilter}
        />

        {filteredPlants.length === 0 ? (
          <p className="empty-state">
            No plants match your filters yet. Add a new plant above to start
            your collection.
          </p>
        ) : (
          <div className="plant-grid">
            {filteredPlants.map((plant) => (
              <PlantCard
                key={plant.id}
                plant={plant}
                actions={
                  <>
                    <button
                      type="button"
                      className="button ghost"
                      onClick={() => handleEdit(plant.id)}
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      className="button danger"
                      onClick={() => handleDelete(plant.id)}
                    >
                      Delete
                    </button>
                  </>
                }
              />
            ))}
          </div>
        )}
      </section>

      {/* Floating add button */}
      <button
        type="button"
        className="fab-add-plant"
        onClick={() => {
          setEditingId(null)
          setIsFormOpen(true)
        }}
        aria-label="Add a new plant"
      >
        +
      </button>

      {/* Popup form for creating/updating plants */}
      {isFormOpen && (
        <div
          className="modal-overlay"
          role="presentation"
          onClick={() => {
            setIsFormOpen(false)
            setEditingId(null)
          }}
        >
          <div
            className="modal"
            role="dialog"
            aria-modal="true"
            aria-label={editingPlant ? 'Edit plant guide' : 'Add plant guide'}
            onClick={(event) => event.stopPropagation()}
          >
            <PlantForm
              onSave={handleSave}
              editingPlant={editingPlant}
              onCancel={() => {
                setIsFormOpen(false)
                setEditingId(null)
              }}
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default MyPlants

