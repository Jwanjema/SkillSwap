import { Link } from 'react-router-dom';
import './HomePage.css';

function HomePage() {
  return (
    <div className="home-page">
      <div className="hero-section">
        <h1>SkillSwap</h1>
        <p className="tagline">Learn and Teach in Your Neighborhood</p>
        <div className="action-buttons">
          <Link to="/skills" className="btn primary">Browse Skills</Link>
          <Link to="/add-skill" className="btn secondary">Add Skill</Link>
          <Link to="/profile" className="btn tertiary">My Profile</Link>
        </div>
      </div>
    </div>
  );
}

export default HomePage;