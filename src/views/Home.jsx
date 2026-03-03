import { useEffect, useState } from 'react'
import PlantCard from '../components/PlantCard.jsx'
import Toast from '../components/Toast.jsx'
import heroImage from '../assets/hero-photo.jpg'
import { predefinedPlants } from '../data/predefinedPlants.js'
import { addPlantToMyPlants, loadMyPlants } from '../utils/myPlantsStorage.js'

const Home = () => {
  const [query, setQuery] = useState('')
  const [myPlants, setMyPlants] = useState(() => loadMyPlants())
  const [toastMessage, setToastMessage] = useState('')
  const [savedGuideIds, setSavedGuideIds] = useState(new Set())
  const [visibleGuides, setVisibleGuides] = useState(predefinedPlants)

  useEffect(() => {
    setSavedGuideIds(
      new Set(myPlants.map((p) => p.importedFrom).filter(Boolean))
    )
  }, [myPlants])

  useEffect(() => {
    const q = query.trim().toLowerCase()
    if (!q) {
      setVisibleGuides(predefinedPlants)
    } else {
      setVisibleGuides(
        predefinedPlants.filter(
          (plant) =>
            plant.commonName.toLowerCase().includes(q) ||
            plant.scientificName.toLowerCase().includes(q)
        )
      )
    }
  }, [query])

  const handleSaveGuide = (guide) => {
    const plantToStore = {
      ...guide,
      id: crypto.randomUUID(),
      importedFrom: guide.id,
    }

    const result = addPlantToMyPlants(plantToStore)
    setMyPlants(result.plants)
    if (result.added) {
      setToastMessage(`Added "${guide.commonName}" to My Plants.`)
    }
  }

  return (
    <div className="page page-home">
      <Toast message={toastMessage} onClose={() => setToastMessage('')} />

      <section className="hero">
        <div className="hero-content">
          <h1>Plant care, made simple and joyful.</h1>
          <p className="hero-text">
            Discover easy-to-follow plant care guides, learn the basics of
            light, soil, and watering, and keep track of your own plant
            collection in one place.
          </p>
          <ul className="hero-highlights">
            <li>Browse curated care guides for popular houseplants.</li>
            <li>Save personalised notes for every plant you own.</li>
            <li>Grow confidence from beginner to expert at your own pace.</li>
          </ul>
        </div>
        <div className="hero-media" aria-hidden="true">
          <img src={heroImage} alt="Hero image showing a person repotting plants" className="hero-photo"/>
        </div>
      </section>

      <section className="section">
        <header className="section-header">
          <h2 className="section-heading">Find plant care guides</h2>
        </header>

        <div className="care-guides-toolbar">
          <label className="care-guides-search">
            <input
              type="search"
              placeholder="Search by plant name…"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
          </label>
          <p className="care-guides-count" aria-live="polite">
            Showing {visibleGuides.length} of {predefinedPlants.length}
          </p>
        </div>

        <div className="plant-grid">
          {visibleGuides.map((plant) => {
            const isSaved = savedGuideIds.has(plant.id)
            return (
              <PlantCard
                key={plant.id}
                plant={plant}
                mediaActions={
                  <button
                    type="button"
                    className="button primary small card-save"
                    onClick={() => handleSaveGuide(plant)}
                    disabled={isSaved}
                    aria-disabled={isSaved}
                    title={isSaved ? 'Already in My Plants' : 'Save to My Plants'}
                  >
                    {isSaved ? 'Saved' : 'Save'}
                  </button>
                }
              />
            )
          })} 
        </div>
      </section>

      <section className="section section-basics">
        <header className="section-header">
          <h2 className="section-heading">Plant care basics</h2>
        </header>
        <div className="basics-grid">
          <article className="basic-card">
            <h3>Light</h3>
            <p>  Most indoor plants prefer bright, indirect light. South- and west-facing windows are strongest, while north-facing spaces are softer and better for low-light species like snake plants or pothos.</p>
          </article>
          <article className="basic-card">
            <h3>Water</h3>
            <p>Overwatering is more common than underwatering. Always check the top 2–3 cm of soil with your finger before watering. If it feels dry, it is time to water; if it is still moist, wait a few days.</p>
          </article>
          <article className="basic-card">
            <h3>Soil & drainage</h3>
            <p>Use a well-draining mix and pots with drainage holes. Cacti and succulents like very gritty mixes, while tropical plants enjoy peat- or coco-based mixes with added perlite or bark.</p>
          </article>
          <article className="basic-card">
            <h3>Environment</h3>
            <p>Keep plants away from cold drafts and hot radiators. Many tropical plants appreciate higher humidity, which you can create with pebble trays, grouping plants together, or a small humidifier.</p>
          </article>
        </div>
      </section>
    </div>
  )
}

export default Home

