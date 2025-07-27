import { useState, useEffect } from 'react';
import axios from 'axios';
import './AddSkillForm.css';

const BASE_URL = import.meta.env.VITE_API_URL;

function AddSkillForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    neighborhood: '',
    userId: 1
  });

  const [categories, setCategories] = useState([]);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    axios.get(`${BASE_URL}/categories`)
      .then(res => setCategories(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.category) newErrors.category = 'Please select a category';
    if (!formData.neighborhood.trim()) newErrors.neighborhood = 'Neighborhood is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const completeFormData = {
        ...formData,
        createdAt: new Date().toISOString()
      };

      const response = await axios.post(`${BASE_URL}/skills`, completeFormData);
      onSubmit(response.data);
      setSubmitSuccess(true);
      setTimeout(() => setSubmitSuccess(false), 3000);
      setFormData({
        title: '',
        description: '',
        category: '',
        neighborhood: '',
        userId: 1
      });
    } catch (error) {
      console.error('Error submitting skill:', error);
      setErrors({ submit: 'Failed to add skill. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="add-skill-form">
      <form onSubmit={handleSubmit}>
        <div className={`form-group ${errors.title ? 'error' : ''}`}>
          <label>Skill Title *</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="What skill are you offering?"
          />
          {errors.title && <span className="error-message">{errors.title}</span>}
        </div>

        <div className={`form-group ${errors.description ? 'error' : ''}`}>
          <label>Description *</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Describe what you'll teach..."
          />
          {errors.description && <span className="error-message">{errors.description}</span>}
        </div>

        <div className={`form-group ${errors.category ? 'error' : ''}`}>
          <label>Category *</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
          >
            <option value="">Select a category</option>
            {categories.map(cat => (
              <option key={cat.id} value={cat.name}>{cat.name}</option>
            ))}
          </select>
          {errors.category && <span className="error-message">{errors.category}</span>}
        </div>

        <div className={`form-group ${errors.neighborhood ? 'error' : ''}`}>
          <label>Neighborhood *</label>
          <input
            type="text"
            name="neighborhood"
            value={formData.neighborhood}
            onChange={handleChange}
            placeholder="Where will you teach?"
          />
          {errors.neighborhood && <span className="error-message">{errors.neighborhood}</span>}
        </div>

        <div className="form-actions">
          <button
            type="button"
            className="cancel-btn"
            onClick={() => {
              setFormData({
                title: '',
                description: '',
                category: '',
                neighborhood: '',
                userId: 1
              });
              setErrors({});
            }}
          >
            Clear
          </button>
          <button
            type="submit"
            className="submit-btn"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Adding...' : 'Add Skill'}
          </button>
        </div>

        {errors.submit && (
          <div className="error-message submit-error">{errors.submit}</div>
        )}

        {submitSuccess && (
          <div className="success-message">
            Skill added successfully!
          </div>
        )}
      </form>
    </div>
  );
}

export default AddSkillForm;
