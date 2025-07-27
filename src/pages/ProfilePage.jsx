import { useState, useEffect } from 'react';
import axios from 'axios';
import SkillList from '../components/SkillList';
import './ProfilePage.css';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [userSkills, setUserSkills] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userId = 1;

    axios.all([
      axios.get(`${BASE_URL}/users/${userId}`),
      axios.get(`${BASE_URL}/skills?userId=${userId}`)
    ])
    .then(axios.spread((userRes, skillsRes) => {
      console.log("User API response:", userRes.data);
      console.log("Skills API response:", skillsRes.data);

      setUser(userRes.data);
      setUserSkills(Array.isArray(skillsRes.data) ? skillsRes.data : []);
    }))
    .catch(err => console.error("Error fetching profile data:", err))
    .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="loading">Loading profile...</div>;
  if (!user) return <div className="error">User not found</div>;

  return (
    <div className="profile-page">
      <div className="profile-header">
        <img 
          src={`https://i.pravatar.cc/150?u=${user.id}`} 
          alt={user.name}
          className="profile-avatar"
        />
        <div className="profile-info">
          <h1>{user.name}</h1>
          <p className="neighborhood">{user.neighborhood}</p>
          <p className="bio">{user.bio}</p>
          <p className="contact">{user.email}</p>
        </div>
      </div>

      <h2>My Offered Skills</h2>
      <SkillList skills={userSkills} />
    </div>
  );
}
