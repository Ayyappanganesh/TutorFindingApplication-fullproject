import React from 'react';
import { Typography, Card, CardContent, Button } from '@mui/material';
import './AboutSection.css';

const AboutSection = () => {
  return (
    <div className="about-section">
      <Typography variant="h4" gutterBottom align="center" className="about-title">
        About Us
      </Typography>
      <Card className="about-card">
        <CardContent>
          <Typography variant="h6" align="justify" className="about-text">
            Welcome to TutorTrek – the ultimate platform designed to connect students with exceptional tutors, making learning more accessible and effective.
          </Typography>
          <Typography variant="h6" mt={2} align="justify" className="about-text">
            Our Mission
          </Typography>
          <Typography variant="body1" paragraph align="justify" className="about-text">
            At TutorTrek, our mission is to revolutionize the way students find and connect with tutors. We believe that every learner deserves personalized, high-quality education tailored to their needs. Whether you’re looking to improve your grades, prepare for an exam, or master a new skill, our platform is here to help you achieve your academic goals.
          </Typography>
          <Typography variant="h6" mt={2} align="justify" className="about-text">
            Why Choose Us?
          </Typography>
          <Typography variant="body1" paragraph align="justify" className="about-text">
            Wide Selection of Tutors: Our platform features a diverse range of qualified tutors specializing in various subjects and grade levels. No matter your learning needs, you’ll find the perfect tutor to guide you.
          </Typography>
          <Typography variant="body1" paragraph align="justify" className="about-text">
            User-Friendly Interface: Easily search for tutors, view profiles, read reviews, and book sessions – all in a few simple clicks. Our intuitive design ensures a seamless experience for both students and tutors.
          </Typography>
          <Typography variant="body1" paragraph align="justify" className="about-text">
            Personalized Learning: Connect with tutors who understand your unique learning style and preferences. Our platform allows you to choose tutors based on their expertise, teaching style, and availability.
          </Typography>
          <Typography variant="body1" paragraph align="justify" className="about-text">
            Flexible Scheduling: Enjoy the convenience of scheduling sessions that fit your busy lifestyle. Our platform supports various time zones and offers flexible booking options.
          </Typography>
          <Typography variant="body1" paragraph align="justify" className="about-text">
            Secure and Confidential: We prioritize your privacy and security. All interactions and transactions on our platform are encrypted and handled with the utmost confidentiality.
          </Typography>
          <Button>Learn More</Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default AboutSection;
