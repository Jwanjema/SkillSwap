import { useState, useEffect } from 'react';
import axios from 'axios';
import './SkillCard.css';

export default function SkillCard({ skill }) {
  const [creator, setCreator] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    // Fetch creator details
    axios.get(`http://localhost:3000/users/${skill.userId}`)
      .then(res => setCreator(res.data))
      .catch(err => console.error(err));

    // Check if favorite
    axios.get(`http://localhost:3000/favorites?skillId=${skill.id}&userId=1`) // Hardcoded userId for demo
      .then(res => setIsFavorite(res.data.length > 0))
      .catch(err => console.error(err));
  }, [skill.id, skill.userId]);

  const toggleFavorite = () => {
    if (isFavorite) {
      axios.get(`http://localhost:3000/favorites?skillId=${skill.id}&userId=1`)
        .then(res => {
          if (res.data.length > 0) {
            return axios.delete(`http://localhost:3000/favorites/${res.data[0].id}`);
          }
        })
        .then(() => setIsFavorite(false))
        .catch(err => console.error(err));
    } else {
      axios.post('http://localhost:3000/favorites', {
        skillId: skill.id,
        userId: 1, // Hardcoded for demo
        createdAt: new Date().toISOString()
      })
      .then(() => setIsFavorite(true))
      .catch(err => console.error(err));
    }
  };

  return (
    <div className="skill-card">
      <div className="card-header">
        <h3>{skill.title}</h3>
        <span className="category-badge">{skill.category}</span>
      </div>
      <p className="description">{skill.description}</p>
      
      <div className="creator-info">
        {creator && (
          <>
            <img 
              src={`https://i.pravatar.cc/40?u=${creator.id}`} 
              alt={creator.name} 
              className="creator-avatar"
            />
            <span>{creator.name}</span>
          </>
        )}
        <span className="neighborhood">{skill.neighborhood}</span>
      </div>
      
      <div className="card-footer">
        <button 
          className={`favorite-btn ${isFavorite ? 'active' : ''}`}
          onClick={toggleFavorite}
        >
          {isFavorite ? '♥' : '♡'}
        </button>
        <span className="date">
          {new Date(skill.createdAt).toLocaleDateString()}
        </span>
      </div>
    </div>
  );
}