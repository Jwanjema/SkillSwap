import { useState, useEffect } from 'react';
import axios from 'axios';
import './SkillCard.css';

export default function SkillCard({ skill, onRemoveFavorite }) {
  const [creator, setCreator] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [favoriteId, setFavoriteId] = useState(null);

  useEffect(() => {
    // Fetch creator info
    axios.get(`http://localhost:3000/users/${skill.userId}`)
      .then(res => setCreator(res.data))
      .catch(err => console.error('User fetch error:', err));

    // If coming from favorites page, use passed favoriteId
    if (skill.favoriteId) {
      setIsFavorite(true);
      setFavoriteId(skill.favoriteId);
    } else {
      // Check if the skill is already favorited
      axios.get(`http://localhost:3000/favorites?skillId=${skill.id}&userId=1`)
        .then(res => {
          if (res.data.length > 0) {
            setIsFavorite(true);
            setFavoriteId(res.data[0].id);
          }
        })
        .catch(err => console.error('Favorite check error:', err));
    }
  }, [skill.id, skill.userId, skill.favoriteId]);

  const handleToggleFavorite = () => {
    if (isFavorite) {
      // Remove from favorites
      if (!favoriteId) return;
      axios.delete(`http://localhost:3000/favorites/${favoriteId}`)
        .then(() => {
          setIsFavorite(false);
          setFavoriteId(null);
        })
        .catch(err => console.error('Favorite removal error:', err));
    } else {
      // Add to favorites
      axios.post('http://localhost:3000/favorites', {
        skillId: skill.id,
        userId: 1,
        createdAt: new Date().toISOString()
      })
        .then(res => {
          setIsFavorite(true);
          setFavoriteId(res.data.id);
        })
        .catch(err => console.error('Favorite add error:', err));
    }
  };

  const handleRemoveClick = () => {
    if (onRemoveFavorite && favoriteId) {
      onRemoveFavorite(favoriteId);
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
        {onRemoveFavorite ? (
          <button className="remove-btn" onClick={handleRemoveClick}>
            Remove from Favorites
          </button>
        ) : (
          <button
            className={`favorite-btn ${isFavorite ? 'active' : ''}`}
            onClick={handleToggleFavorite}
          >
            {isFavorite ? '♥' : '♡'}
          </button>
        )}
        <span className="date">
          {new Date(skill.createdAt).toLocaleDateString()}
        </span>
      </div>
    </div>
  );
}
