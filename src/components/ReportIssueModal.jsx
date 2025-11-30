import React, { useState } from 'react';
import '../styles/ReportIssueModal.css';

function ReportIssueModal({ isOpen, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Roads',
    location: '',
    email: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categories = [
    'Roads',
    'Public Safety',
    'Parks',
    'Water Supply',
    'Utilities',
    'Lighting',
    'Other'
  ];

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    } else if (formData.title.length < 5) {
      newErrors.title = 'Title must be at least 5 characters';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    } else if (formData.description.length < 20) {
      newErrors.description = 'Description must be at least 20 characters';
    }

    if (!formData.location.trim()) {
      newErrors.location = 'Location is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Create new issue object
      const newIssue = {
        id: Math.floor(Math.random() * 10000),
        title: formData.title,
        description: formData.description,
        category: formData.category,
        location: formData.location,
        email: formData.email,
        status: 'Submitted',
        upvotes: 0,
        reported: 'just now',
        reportedDate: new Date().toLocaleString()
      };

      // Call parent's onSubmit callback
      onSubmit(newIssue);

      // Reset form
      setFormData({
        title: '',
        description: '',
        category: 'Roads',
        location: '',
        email: ''
      });

      // Close modal
      onClose();
    } catch (error) {
      console.error('Error submitting issue:', error);
      setErrors({ submit: 'Failed to submit issue. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Report a New Issue</h2>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        <form onSubmit={handleSubmit} className="report-form">
          {errors.submit && <div className="form-error">{errors.submit}</div>}

          <div className="form-group">
            <label htmlFor="title">Issue Title *</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g., Large pothole on Main Street"
              className={errors.title ? 'error' : ''}
            />
            {errors.title && <span className="field-error">{errors.title}</span>}
            <small>{formData.title.length}/100</small>
          </div>

          <div className="form-group">
            <label htmlFor="description">Description *</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe the issue in detail..."
              rows={4}
              className={errors.description ? 'error' : ''}
            />
            {errors.description && <span className="field-error">{errors.description}</span>}
            <small>{formData.description.length}/500</small>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="category">Category *</label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="location">Location *</label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="e.g., Main Street & 5th Ave"
                className={errors.location ? 'error' : ''}
              />
              {errors.location && <span className="field-error">{errors.location}</span>}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="email">Your Email *</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="your.email@example.com"
              className={errors.email ? 'error' : ''}
            />
            {errors.email && <span className="field-error">{errors.email}</span>}
          </div>

          <div className="form-actions">
            <button
              type="button"
              className="btn-cancel"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span className="spinner"></span> Submitting...
                </>
              ) : (
                '📝 Submit Issue'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ReportIssueModal;
