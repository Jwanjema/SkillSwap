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

      <section className="features-section">
  <h2 className="features-title">Why SkillSwap?</h2>
  <div className="features-container">
    <div className="feature-card">
      <h3>🧠 Learn New Skills</h3>
      <p>Discover hobbies, tech skills, languages, and more from people nearby.</p>
    </div>
    <div className="feature-card">
      <h3>🤝 Share Your Knowledge</h3>
      <p>Help others grow by teaching what you know — no teaching experience needed.</p>
    </div>
    <div className="feature-card">
      <h3>📍 Local Connections</h3>
      <p>Engage with your community and meet learners or teachers in your neighborhood.</p>
    </div>
  </div>
</section>


      <div className="intro-section">
        <p className="intro">
          <strong>What is SkillSwap?</strong><br />
          SkillSwap connects neighbors who want to learn and teach a variety of skills — from coding and cooking to guitar and gardening. Whether you're offering your expertise or seeking to grow, this is your community.
        </p>
      </div>
      <footer className="footer">
  <p>&copy; {new Date().getFullYear()} SkillSwap. All rights reserved.</p>
  <div className="footer-links">
    <a href="#">Terms</a>
    <a href="#">Privacy</a>
    <a href="#">Contact</a>
  </div>
</footer>

    </div>

    
  );
}

export default HomePage;
