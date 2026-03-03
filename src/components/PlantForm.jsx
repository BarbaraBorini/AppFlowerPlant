import { useEffect, useRef, useState } from 'react'

// Base shape for a new, empty plant.
const emptyPlant = {
  commonName: '',
  scientificName: '',
  imageUrl: '',
  light: '',
  watering: '',
  soil: '',
  difficulty: 'Beginner',
}

// Reusable form used for both "create" and "edit" flows.
// - onSave is called with the plant data when the form is submitted
// - editingPlant holds the plant currently being edited (or null)
// - onCancel resets edit mode in the parent component
const PlantForm = ({ onSave, editingPlant, onCancel }) => {
  const [plant, setPlant] = useState(emptyPlant)
  const commonNameRef = useRef(null)

  // Whenever editingPlant changes, either:
  // - load its values into the form (edit mode), or
  // - reset back to the empty template (create mode).
  useEffect(() => {
    if (editingPlant) {
      setPlant(editingPlant)
    } else {
      setPlant(emptyPlant)
    }
  }, [editingPlant])

  // When entering edit mode, place the cursor in the first input.
  useEffect(() => {
    if (!editingPlant) return
    commonNameRef.current?.focus()
  }, [editingPlant])

  const handleChange = (event) => {
    const { name, value } = event.target
    setPlant((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    // Require at least a common name before saving.
    if (!plant.commonName.trim()) {
      return
    }
    onSave(plant)
  }

  return (
    <form className="plant-form" onSubmit={handleSubmit}>
      <h2 className="section-heading">
        {editingPlant ? 'Update plant guide' : 'Add a new plant'}
      </h2>
      <div className="form-grid">
        <label className="form-field">
          <span>Common name *</span>
          <input
            type="text"
            name="commonName"
            value={plant.commonName}
            onChange={handleChange}
            required
            ref={commonNameRef}
          />
        </label>
        <label className="form-field">
          <span>Scientific name</span>
          <input
            type="text"
            name="scientificName"
            value={plant.scientificName}
            onChange={handleChange}
          />
        </label>
        <label className="form-field form-field-wide">
          <span>Image URL (optional)</span>
          <input
            type="url"
            name="imageUrl"
            value={plant.imageUrl || ''}
            onChange={handleChange}
            placeholder="https://…"
          />
        </label>
        <label className="form-field">
          <span>Preferred light</span>
          <select
            name="light"
            value={plant.light}
            onChange={handleChange}
          >
            <option>Full sun</option>
            <option>Part sun, part shade</option>
            <option>Shade</option>
          </select>
        </label>
        <label className="form-field">
          <span>Soil type</span>
          <select
            name="soil"
            value={plant.soil}
            onChange={handleChange}
          >
            <option>Cactus and suculent soil mix</option>
            <option>Tropical soil mix</option>
            <option>All-purpose potting mix</option>
            <option>Seed starting mix</option>
            <option>Orchid potting mix</option>
            <option>All-purpose garden soil</option>
          </select>
        </label>

        <label className="form-field form-field-wide">
          <span>Watering schedule</span>
          <input
            type="text"
            name="watering"
            value={plant.watering}
            onChange={handleChange}
            placeholder="e.g. Every 1–2 weeks"
          />
        </label>
        <label className="form-field">
          <span>Difficulty level</span>
          <select
            name="difficulty"
            value={plant.difficulty}
            onChange={handleChange}
          >
            <option>Beginner</option>
            <option>Intermediate</option>
            <option>Expert</option>
          </select>
        </label>
      </div>
      <div className="form-actions">
        <button type="submit" className="button primary">
          {editingPlant ? 'Save changes' : 'Add plant'}
        </button>
        {editingPlant && (
          <button
            type="button"
            className="button ghost"
            onClick={onCancel}
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  )
}

export default PlantForm

