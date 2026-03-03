import { Routes, Route } from 'react-router-dom'
import './App.css'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import Home from './views/Home.jsx'
import MyPlants from './views/MyPlants.jsx'
import About from './views/About.jsx'

// The header and footer are always visible, only the <Routes> area changes when navigation happens.

function App() {
  return (
    <div className="app">
      <Header />
      <main className="app-main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/my-plants" element={<MyPlants />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App