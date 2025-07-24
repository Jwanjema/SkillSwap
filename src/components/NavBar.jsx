import { Link } from 'react-router-dom'
import './NavBar.css'

export default function NavBar() {
  return (
    <nav className="navbar">
      <Link to="/" className="logo"><img src='/logo.png' alt='SkillSwap logo'></img></Link>
      <div className="nav-links">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/skills" className="nav-link">Browse</Link>
        <Link to="/add-skill" className="nav-link">Add Skill</Link>
        <Link to="/profile" className="nav-link">Profile</Link>
        <Link to="/favorites" className="nav-link">Favorites</Link>
      </div>
    </nav>
  )
}