import { useState, useEffect } from 'react';
import axios from 'axios';
import './SearchBar.css';

export default function SearchBar({ 
  searchTerm, 
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
  nearMe,
  setNearMe
}) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/categories')
      .then(res => setCategories(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Search skills..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />
      
      <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
        className="category-select"
      >
        <option value="All">All Categories</option>
        {categories.map(category => (
          <option key={category.id} value={category.name}>
            {category.name}
          </option>
        ))}
      </select>

      <label className="nearme-toggle">
        <input
          type="checkbox"
          checked={nearMe}
          onChange={() => setNearMe(!nearMe)}
        />
        <span>Near Me</span>
      </label>
    </div>
  );
}