import { NavLink } from 'react-router-dom'

// Global site header. NavLink gets 'nav-link-active' when the route matches (styled in CSS).
const Header = () => {
  const getNavLinkClass = ({ isActive }) =>
    isActive ? 'nav-link nav-link-active' : 'nav-link'

  return (
    <header className="site-header">
      <div className="header-inner">
        <div className="brand">
          <span className="brand-mark">FlowerPlant</span>
          <span className="brand-tagline">Grow your green haven</span>
        </div>
        <nav className="nav">
          <NavLink to="/" end className={getNavLinkClass}>
            Home
          </NavLink>
          <NavLink to="/my-plants" className={getNavLinkClass}>
            My Plants
          </NavLink>
          <NavLink to="/about" className={getNavLinkClass}>
            About
          </NavLink>
        </nav>
      </div>
    </header>
  )
}

export default Header

