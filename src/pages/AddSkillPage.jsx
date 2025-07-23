import { useNavigate } from 'react-router-dom';
import AddSkillForm from '../components/AddSkillForm';
import './AddSkillPage.css';

export default function AddSkillPage() {
  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate('/skills'); // Just navigate after form submits
  };

  return (
    <div className="add-skill-page">
      <h2>Share Your Skill</h2>
      <AddSkillForm onSubmit={handleSubmit} />
    </div>
  );
}