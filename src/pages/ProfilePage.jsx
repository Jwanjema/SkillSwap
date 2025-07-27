import { useEffect, useState } from 'react';
import axios from 'axios';
import SkillList from '../components/SkillList';
import EditSkillModal from '../components/EditSkillModal';
import './ProfilePage.css';

const API_URL = import.meta.env.VITE_API_URL;

export default function ProfilePage() {
  const [userSkills, setUserSkills] = useState([]);
  const [editingSkill, setEditingSkill] = useState(null);

  useEffect(() => {
    axios.get(`${API_URL}/skills?userId=1`)
      .then(res => setUserSkills(res.data))
      .catch(err => console.error('Skill fetch error:', err));
  }, []);

  const handleDeleteSkill = (skillId) => {
    axios.delete(`${API_URL}/skills/${skillId}`)
      .then(() => {
        setUserSkills(prev => prev.filter(skill => skill.id !== skillId));
      })
      .catch(err => console.error('Delete error:', err));
  };

  const handleEditClick = (skill) => {
    setEditingSkill(skill);
  };

  const handleCloseModal = () => {
    setEditingSkill(null);
  };

  const handleSaveEdit = (updatedSkill) => {
    axios.patch(`${API_URL}/skills/${updatedSkill.id}`, updatedSkill)
      .then(res => {
        setUserSkills(prev =>
          prev.map(skill => (skill.id === res.data.id ? res.data : skill))
        );
        setEditingSkill(null);
      })
      .catch(err => console.error('Edit save error:', err));
  };

  return (
    <div className="profile-page">
      <h2>My Skills</h2>
      <SkillList
        skills={userSkills}
        isOwnSkill={true}
        onDelete={handleDeleteSkill}
        onEdit={handleEditClick}
      />
      {editingSkill && (
        <EditSkillModal
          skill={editingSkill}
          onClose={handleCloseModal}
          onSave={handleSaveEdit}
        />
      )}
    </div>
  );
}
