import SkillCard from './SkillCard';
import './SkillList.css';

export default function SkillList({ skills, onRemoveFavorite }) {
  return (
    <div className="skill-list">
      {skills.length > 0 ? (
        <div className="skills-grid">
          {skills.map(skill => (
            <SkillCard
              key={skill.id}
              skill={skill}
              onRemoveFavorite={onRemoveFavorite}
            />
          ))}
        </div>
      ) : (
        <p className="no-results">No skills found matching your criteria</p>
      )}
    </div>
  );
}
