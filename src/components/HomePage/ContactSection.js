import React from 'react';
import { Container, Box, Typography, Grid, Divider, IconButton } from '@mui/material';
import { Email, Instagram, Facebook, GitHub, WhatsApp } from '@mui/icons-material';
import './ContactSection.css';

const ContactSection = () => {
  return (
    <Container className="contact-section" id="contact-section">
      <Box my={15} textAlign="center">
        <Typography variant="h4" gutterBottom>Contact Us</Typography>
        <Divider />
        <Grid container spacing={10} justifyContent="center">
          <Grid item>
            <IconButton component="a" href="mailto:tutorquest@gmail.com" aria-label="email">
              <Email />
            </IconButton>
            <Typography variant="body1">Email</Typography>
          </Grid>
          <Grid item>
            <IconButton component="a" href="https://www.instagram.com/tutorquest" target="_blank" aria-label="Instagram">
              <Instagram />
            </IconButton>
            <Typography variant="body1">Instagram</Typography>
          </Grid>
          <Grid item>
            <IconButton component="a" href="https://www.facebook.com/tutorquest" target="_blank" aria-label="Facebook">
              <Facebook />
            </IconButton>
            <Typography variant="body1">Facebook</Typography>
          </Grid>
          <Grid item>
            <IconButton component="a" href="https://github.com/tutorquest" target="_blank" aria-label="GitHub">
              <GitHub />
            </IconButton>
            <Typography variant="body1">GitHub</Typography>
          </Grid>
          <Grid item>
            <IconButton component="a" href="https://wa.me/1234567890" target="_blank" aria-label="WhatsApp">
              <WhatsApp />
            </IconButton>
            <Typography variant="body1">WhatsApp</Typography>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default ContactSection;