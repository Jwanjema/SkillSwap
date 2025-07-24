import { useState, useEffect } from 'react';
import axios from 'axios';
import SkillList from '../components/SkillList';
import './FavoritesPage.css';

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/favorites')
      .then(res => setFavorites(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="favorites-page">
      <h2>Your Favorites</h2>
      <SkillList skills={favorites} />
    </div>
  );
}