import React, { useState } from 'react';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: ''
  });

  const [notification, setNotification] = useState({ show: false, message: '', type: '' });

  const showNotification = (message, type = 'info') => {
    setNotification({ show: true, message, type });
    setTimeout(() => {
      setNotification({ show: false, message: '', type: '' });
    }, 5000);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e, method = 'default') => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.message) {
      showNotification('Please fill in all required fields', 'error');
      return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      showNotification('Please enter a valid email address', 'error');
      return;
    }
    
    // Create email content
    const fullName = `${formData.firstName} ${formData.lastName}`;
    const emailSubject = `Portfolio Contact from ${fullName}`;
    const emailBody = `Hi Chia,

My name is ${fullName} and I found your portfolio. I'd like to get in touch with you.

Email: ${formData.email}

Message:
${formData.message}

Best regards,
${fullName}`;
    
    if (method === 'gmail') {
      // Gmail web interface
      const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=chiaranchber@gmail.com&su=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
      window.open(gmailUrl, '_blank');
      showNotification('Opening Gmail... Thank you for reaching out!', 'success');
    } else {
      // Default email client (mailto)
      const mailtoLink = `mailto:chiaranchber@gmail.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
      window.location.href = mailtoLink;
      showNotification('Opening your email client... Thank you for reaching out!', 'success');
    }
    
    // Reset form after a short delay
    setTimeout(() => {
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        message: ''
      });
    }, 1000);
  };

  return (
    <div className="contact-form">
      <form id="contactForm" className="contact-form-container">
        <h3>Send Me a Message</h3>
        <p>Fill out the form below and I'll get back to you as soon as possible.</p>
        
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="firstName">First Name *</label>
            <input 
              type="text" 
              id="firstName" 
              name="firstName" 
              value={formData.firstName}
              onChange={handleInputChange}
              required 
            />
          </div>
          <div className="form-group">
            <label htmlFor="lastName">Last Name *</label>
            <input 
              type="text" 
              id="lastName" 
              name="lastName" 
              value={formData.lastName}
              onChange={handleInputChange}
              required 
            />
          </div>
        </div>
        
        <div className="form-group">
          <label htmlFor="email">Email Address *</label>
          <input 
            type="email" 
            id="email" 
            name="email" 
            value={formData.email}
            onChange={handleInputChange}
            required 
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="message">Message *</label>
          <textarea 
            id="message" 
            name="message" 
            rows="5" 
            value={formData.message}
            onChange={handleInputChange}
            required 
            placeholder="Your message..."
          ></textarea>
        </div>
        
        <div className="form-buttons">
          <button 
            type="submit" 
            className="btn btn-primary btn-send" 
            onClick={(e) => handleSubmit(e, 'default')}
          >
            <i className="fas fa-envelope"></i>
            Open Email Client
          </button>
          <button 
            type="button" 
            className="btn btn-secondary btn-send" 
            onClick={(e) => handleSubmit(e, 'gmail')}
          >
            <i className="fab fa-google"></i>
            Send via Gmail
          </button>
        </div>
        
        <p className="form-note">
          * Required fields. Choose your preferred email method to send to chiaranchber@gmail.com
        </p>
      </form>

      {/* Notification */}
      {notification.show && (
        <div className={`notification notification-${notification.type}`}>
          {notification.message}
        </div>
      )}
    </div>
  );
};

export default ContactForm;
