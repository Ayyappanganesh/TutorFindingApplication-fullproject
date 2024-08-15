import React, { useState, useEffect } from 'react';
import { Typography, TextField, Button, Box } from '@mui/material';
import Slider from 'react-slick';
import axios from 'axios';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './TestimonialsSection.css';

const TestimonialsSection = ({ id }) => {
  const [testimonials, setTestimonials] = useState([]);
  const [newTestimonial, setNewTestimonial] = useState({ content: '', author: '' });
  const [contentError, setContentError] = useState('');

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/testimonials');
      setTestimonials(response.data);
    } catch (error) {
      console.error('Error fetching testimonials:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'content' && value.split(' ').length > 200) {
      setContentError('Content should not exceed 200 words');
    } else {
      setContentError('');
      setNewTestimonial({ ...newTestimonial, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newTestimonial.content && newTestimonial.author) {
      try {
        const response = await axios.post('http://localhost:8080/api/testimonials', newTestimonial);
        setTestimonials([...testimonials, response.data]);
        setNewTestimonial({ content: '', author: '' });
      } catch (error) {
        console.error('Error submitting testimonial:', error);
      }
    }
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
  };

  return (
    <div className="testimonials-section" id={id}>
      <Typography variant="h4" gutterBottom>Testimonials</Typography>
      <Slider {...settings}>
        {testimonials.map(testimonial => (
          <Box key={testimonial.id} className="testimonial-slide">
            <Typography variant="body1">{testimonial.content}</Typography>
            <Typography variant="caption">- {testimonial.author}</Typography>
          </Box>
        ))}
      </Slider>
      <form className="testimonial-form" onSubmit={handleSubmit}>
        <TextField
          label="Your Testimonial"
          name="content"
          value={newTestimonial.content}
          onChange={handleInputChange}
          fullWidth
          required
          multiline
          rows={4}
          variant="outlined"
          margin="normal"
          error={!!contentError}
          helperText={contentError}
        />
        <TextField
          label="Your Name"
          name="author"
          value={newTestimonial.author}
          onChange={handleInputChange}
          fullWidth
          required
          variant="outlined"
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary" disabled={!!contentError}>
          Submit
        </Button>
      </form>
    </div>
  );
};

export default TestimonialsSection;
