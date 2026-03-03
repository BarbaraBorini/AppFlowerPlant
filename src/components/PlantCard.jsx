// Presentational component that renders a single plant care guide.
// Optional "actions" slot lets parents inject buttons (edit/delete, etc.).
// `mediaActions` renders as an overlay on top of the image.
const PlantCard = ({ plant, mediaActions, actions }) => {
  const {
    commonName,
    scientificName,
    imageUrl,
    light,
    watering,
    soil,
    difficulty,
  } = plant

  return (
    <article className="plant-card">
      <div className="plant-card-media">
        {mediaActions && (
          <div className="plant-card-media-actions">{mediaActions}</div>
        )}
        {imageUrl ? (
          <img
            className="plant-card-image"
            src={imageUrl}
            alt={commonName ? `${commonName} plant` : 'Plant'}
            loading="lazy"
          />
        ) : (
          <div className="plant-card-image plant-card-image-empty" />
        )}
      </div>
      <header className="plant-card-header">
        <h3 className="plant-name">{commonName}</h3>
        <p className="plant-scientific">{scientificName}</p>
      </header>
      <dl className="plant-details">
        <div className="plant-detail-row">
          <dt>Light</dt>
          <dd>{light}</dd>
        </div>
        <div className="plant-detail-row">
          <dt>Watering</dt>
          <dd>{watering}</dd>
        </div>
        <div className="plant-detail-row">
          <dt>Soil</dt>
          <dd>{soil}</dd>
        </div>
        <div className="plant-detail-row">
          <dt>Level</dt>
          <dd>{difficulty}</dd>
        </div>
      </dl>
      {actions && <div className="plant-card-actions">{actions}</div>}
    </article>
  )
}

export default PlantCard

