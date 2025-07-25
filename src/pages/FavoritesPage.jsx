import { useState, useEffect } from 'react';
import axios from 'axios';
import SkillList from '../components/SkillList';
import './FavoritesPage.css';

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState([]);
  const [skills, setSkills] = useState([]);
  const [favoriteSkills, setFavoriteSkills] = useState([]);

  useEffect(() => {
    Promise.all([
      axios.get('http://localhost:3000/favorites'),
      axios.get('http://localhost:3000/skills')
    ])
      .then(([favoritesRes, skillsRes]) => {
        setFavorites(favoritesRes.data);
        setSkills(skillsRes.data);
        setFavoriteSkills(
          favoritesRes.data
            .map(fav => {
              const skill = skillsRes.data.find(skill => skill.id === fav.skillId);
              return skill ? { ...skill, favoriteId: fav.id } : null;
            })
            .filter(Boolean)
        );
      })
      .catch(err => console.error(err));
  }, []);

  const handleRemoveFavorite = (favoriteId) => {
    axios.delete(`http://localhost:3000/favorites/${favoriteId}`)
      .then(() => {
        // Remove from state
        const updatedSkills = favoriteSkills.filter(skill => skill.favoriteId !== favoriteId);
        setFavoriteSkills(updatedSkills);
      })
      .catch(err => console.error('Failed to remove favorite:', err));
  };

  return (
    <div className="favorites-page">
      <h2>Your Favorite Skills</h2>
      <SkillList skills={favoriteSkills} onRemoveFavorite={handleRemoveFavorite} />
    </div>
  );
}
