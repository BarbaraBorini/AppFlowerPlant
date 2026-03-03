// The parent component owns the state and passes handlers down.
const FilterBar = ({ search, level, onSearchChange, onLevelChange }) => {
  return (
    <section className="filter-bar" aria-label="Filter personal plant guides">
      <div className="filter-field">
        <label htmlFor="search-input">Search</label>
        <input
          id="search-input"
          type="search"
          placeholder="Search by plant name…"
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
        />
      </div>
      <div className="filter-field">
        <label htmlFor="level-select">Difficulty</label>
        <select
          id="level-select"
          value={level}
          onChange={(event) => onLevelChange(event.target.value)}
        >
          <option value="all">All levels</option>
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Expert">Expert</option>
        </select>
      </div>
    </section>
  )
}

export default FilterBar

