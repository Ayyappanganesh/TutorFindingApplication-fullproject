import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import './StudentRegister.css';

const StudentRegister = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // Add your logic here to send the form data to your server or API
    // Assuming the profile page URL is "/student-profile/:studentId"
    // Replace `studentId` with actual ID from your server response
    navigate(`/studentprofile/${formData.name}`);
  };

  return (
    <div className="student-register-container">
      <div className="back-button" onClick={() => navigate('/')}>
        <ArrowCircleLeftIcon />
      </div>
      <div className="student-register-content">
        <h1 className="student-register-title">Student Registration</h1>
        <form className="student-register-form" onSubmit={handleSubmit}>
          <div className="student-register-form-group">
            <label className="student-register-label" htmlFor="name">Name:</label>
            <input
              className="student-register-input"
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="student-register-form-group">
            <label className="student-register-label" htmlFor="email">Email:</label>
            <input
              className="student-register-input"
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="student-register-form-group">
            <label className="student-register-label" htmlFor="password">Password:</label>
            <input
              className="student-register-input"
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button className="student-register-button" type="submit">Register</button>
        </form>
      </div>
    </div>
  );
};

export default StudentRegister;
