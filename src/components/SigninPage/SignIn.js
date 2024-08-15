import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Grid, TextField, Button, Typography, Link } from '@mui/material';
import './SignIn.css'; // Import the CSS file

const SignIn = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ username: '', password: '' });

  const mockData = {
    teachers: [
      { username: 'teacher1', password: 'password1' },
      { username: 'teacher2', password: 'password2' },
    ],
    students: [
      { username: 'student1', password: 'password1' }, 
      { username: 'student2', password: 'password2' },
    ],
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const { username, password } = credentials;

    const isTeacher = mockData.teachers.some(
      (teacher) => teacher.username === username && teacher.password === password
    );

    const isStudent = mockData.students.some(
      (student) => student.username === username && student.password === password
    );

    if (isTeacher) {
      navigate('/myaccount');
    } else if (isStudent) {
      navigate('/studentprofile');
    } else {
      alert('Invalid credentials. Please try again.');
    }
  };

  const handleChange = (event) => {
    setCredentials({
      ...credentials,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <Grid container component="main" className="root">
      <Grid
        item
        xs={12}
        sm={6}
        md={7}
        className="image"
        style={{ backgroundImage: `url(lms/src/assets/StudentLogin.jpg)` }}
      >
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100"
          color="white"
          p={5}
          flexDirection="column"
          marginTop={40}
        >
          <Typography variant="h3" className="welcome-text">Welcome to</Typography>
          <Typography variant="h4" className="portal-text">TutorTrek</Typography>
          <Typography variant="subtitle1" className="login-text">Login to access your account</Typography>
        </Box>
      </Grid>
      <Grid item xs={12} sm={6} md={5} className="login-container">
        <Box display="flex" flexDirection="column" alignItems="center">
          <Typography component="h1" variant="h5" className="title">Login</Typography>
          <Typography component="h6" variant="subtitle1" className="subtitle">Enter your account details</Typography>
          <form className="form" noValidate onSubmit={handleSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              className="input"
              onChange={handleChange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              className="input"
              onChange={handleChange}
            />
            <Link href="#" variant="body2" className="link">Forgot Password?</Link>
            <Button type="submit" fullWidth variant="contained" color="primary" className="button">Login</Button>
            <Grid container>
              <Grid item>
                <Link href="/TeacherRegister" variant="body2" className="link">{"Don't have an account? Register as Teacher "}</Link>
              </Grid>
              <Grid item>
                <Link href="/StudentRegister" variant="body2" className="link">{" Don't have an account? Register as Student"}</Link>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Grid>
    </Grid>
  );
};

export default SignIn;
