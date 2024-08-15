import React from 'react';
import { Container, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import './HeroSection.css';

const HeroSection = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/search');
  };

  return (
    <div className="hero-section">
      <Container>
        <Typography variant="h3">Welcome to TutorTrek</Typography>
        <Typography variant="h6">Your gateway to quality education</Typography>
        <Button variant="contained" color="primary" onClick={handleGetStarted}>
          Get Started
        </Button>
      </Container>
    </div>
  );
};

export default HeroSection;
