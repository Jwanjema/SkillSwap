// src/components/EditSkillModal.jsx
import { useState, useEffect } from "react";
import "./EditSkillModal.css";

export default function EditSkillModal({ skill, onClose, onSave }) {
  const [editedSkill, setEditedSkill] = useState({ ...skill });

  useEffect(() => {
    setEditedSkill({ ...skill });
  }, [skill]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedSkill((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(editedSkill);
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <h2>Edit Skill</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Title:
            <input
              name="title"
              value={editedSkill.title}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Description:
            <textarea
              name="description"
              value={editedSkill.description}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Category:
            <input
              name="category"
              value={editedSkill.category}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Neighborhood:
            <input
              name="neighborhood"
              value={editedSkill.neighborhood}
              onChange={handleChange}
              required
            />
          </label>
          <div className="modal-actions">
            <button type="submit" className="save-btn">Save</button>
            <button type="button" onClick={onClose} className="cancel-btn">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}
