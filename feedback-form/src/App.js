import React, { useState } from 'react';

export default function FeedbackForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    rating: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [submittedFeedback, setSubmittedFeedback] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    // Rating validation
    if (!formData.rating) {
      newErrors.rating = 'Please select a rating';
    }

    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = 'Feedback message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    return newErrors;
  };

  const handleSubmit = () => {
    const newErrors = validateForm();
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Add feedback to list
    const feedback = {
      id: Date.now(),
      ...formData,
      date: new Date().toLocaleDateString()
    };
    
    setSubmittedFeedback([feedback, ...submittedFeedback]);
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      rating: '',
      message: ''
    });
    setErrors({});
    setShowSuccess(true);

    // Hide success message after 3 seconds
    setTimeout(() => {
      setShowSuccess(false);
    }, 3000);
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f3f4f6',
      padding: '40px 20px',
      fontFamily: 'Arial, sans-serif'
    }}>
      <div style={{
        maxWidth: '800px',
        margin: '0 auto'
      }}>
        <h1 style={{
          fontSize: '32px',
          fontWeight: 'bold',
          marginBottom: '32px',
          color: '#1f2937',
          textAlign: 'center'
        }}>
          Feedback Form
        </h1>

        {/* Success Message */}
        {showSuccess && (
          <div style={{
            backgroundColor: '#10b981',
            color: 'white',
            padding: '16px',
            borderRadius: '8px',
            marginBottom: '24px',
            textAlign: 'center'
          }}>
            ✓ Feedback submitted successfully!
          </div>
        )}

        {/* Form */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '8px',
          padding: '32px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
          marginBottom: '32px'
        }}>
          {/* Name Field */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              fontWeight: 'bold',
              color: '#374151'
            }}>
              Name *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '12px',
                border: errors.name ? '2px solid #ef4444' : '1px solid #d1d5db',
                borderRadius: '4px',
                fontSize: '16px',
                boxSizing: 'border-box'
              }}
              placeholder="Enter your name"
            />
            {errors.name && (
              <p style={{ color: '#ef4444', fontSize: '14px', marginTop: '4px' }}>
                {errors.name}
              </p>
            )}
          </div>

          {/* Email Field */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              fontWeight: 'bold',
              color: '#374151'
            }}>
              Email *
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '12px',
                border: errors.email ? '2px solid #ef4444' : '1px solid #d1d5db',
                borderRadius: '4px',
                fontSize: '16px',
                boxSizing: 'border-box'
              }}
              placeholder="your.email@example.com"
            />
            {errors.email && (
              <p style={{ color: '#ef4444', fontSize: '14px', marginTop: '4px' }}>
                {errors.email}
              </p>
            )}
          </div>

          {/* Rating Field */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              fontWeight: 'bold',
              color: '#374151'
            }}>
              Rating *
            </label>
            <select
              name="rating"
              value={formData.rating}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '12px',
                border: errors.rating ? '2px solid #ef4444' : '1px solid #d1d5db',
                borderRadius: '4px',
                fontSize: '16px',
                boxSizing: 'border-box'
              }}
            >
              <option value="">Select a rating</option>
              <option value="5">⭐⭐⭐⭐⭐ Excellent</option>
              <option value="4">⭐⭐⭐⭐ Good</option>
              <option value="3">⭐⭐⭐ Average</option>
              <option value="2">⭐⭐ Poor</option>
              <option value="1">⭐ Very Poor</option>
            </select>
            {errors.rating && (
              <p style={{ color: '#ef4444', fontSize: '14px', marginTop: '4px' }}>
                {errors.rating}
              </p>
            )}
          </div>

          {/* Message Field */}
          <div style={{ marginBottom: '24px' }}>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              fontWeight: 'bold',
              color: '#374151'
            }}>
              Feedback Message *
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="5"
              style={{
                width: '100%',
                padding: '12px',
                border: errors.message ? '2px solid #ef4444' : '1px solid #d1d5db',
                borderRadius: '4px',
                fontSize: '16px',
                boxSizing: 'border-box',
                resize: 'vertical'
              }}
              placeholder="Share your feedback with us..."
            />
            {errors.message && (
              <p style={{ color: '#ef4444', fontSize: '14px', marginTop: '4px' }}>
                {errors.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            style={{
              width: '100%',
              padding: '14px',
              backgroundColor: '#3b82f6',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              fontSize: '16px',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
          >
            Submit Feedback
          </button>
        </div>

        {/* Display Submitted Feedback */}
        {submittedFeedback.length > 0 && (
          <div style={{
            backgroundColor: 'white',
            borderRadius: '8px',
            padding: '32px',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
          }}>
            <h2 style={{
              fontSize: '24px',
              fontWeight: 'bold',
              marginBottom: '24px',
              color: '#1f2937'
            }}>
              Recent Feedback
            </h2>

            {submittedFeedback.map((feedback) => (
              <div
                key={feedback.id}
                style={{
                  backgroundColor: '#f9fafb',
                  padding: '20px',
                  borderRadius: '8px',
                  marginBottom: '16px',
                  borderLeft: '4px solid #3b82f6'
                }}
              >
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: '12px'
                }}>
                  <div>
                    <p style={{
                      fontWeight: 'bold',
                      fontSize: '18px',
                      color: '#1f2937'
                    }}>
                      {feedback.name}
                    </p>
                    <p style={{ color: '#6b7280', fontSize: '14px' }}>
                      {feedback.email}
                    </p>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <p style={{
                      fontSize: '20px',
                      marginBottom: '4px'
                    }}>
                      {'⭐'.repeat(parseInt(feedback.rating))}
                    </p>
                    <p style={{ color: '#6b7280', fontSize: '12px' }}>
                      {feedback.date}
                    </p>
                  </div>
                </div>
                <p style={{
                  color: '#374151',
                  lineHeight: '1.6'
                }}>
                  {feedback.message}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}