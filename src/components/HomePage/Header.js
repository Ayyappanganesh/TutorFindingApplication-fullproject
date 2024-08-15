import React, { useState } from 'react';
import { AppBar, Toolbar, Button, Menu, MenuItem } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll';
import './Header.css';
import Logo from '../../assets/Logo.png'; // Correct import path

const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const offset = -84; // Adjust this value according to your header height

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="fixed" className="header">
      <Toolbar className="navbar">
        <div className="logo-container">
          <img src={Logo} alt="Logo" className="logo" />
        </div>
        <div className="nav-links">
          <Button className="nav-button">
            <ScrollLink to="hero-section" smooth={true} duration={500} offset={offset}>Home</ScrollLink>
          </Button>
          <Button className="nav-button">
            <ScrollLink to="about-section" smooth={true} duration={500} offset={offset}>About</ScrollLink>
          </Button>
          <Button className="nav-button">
            <ScrollLink to="testimonials-section" smooth={true} duration={500} offset={offset}>Testimonials</ScrollLink>
          </Button>
          <Button className="nav-button">
            <ScrollLink to="contact-section" smooth={true} duration={500} offset={offset}>Contact</ScrollLink>
          </Button>
          <Button className="nav-button" component={RouterLink} to="/SignIn">Login</Button>

          {/* Register Button with Dropdown */}
          <Button
            className="nav-button"
            aria-controls="register-menu"
            aria-haspopup="true"
            onClick={handleClick}
          >
            Register
          </Button>
          <Menu
            id="register-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose} component={RouterLink} to="/StudentRegister">
              Student Register
            </MenuItem>
            <MenuItem onClick={handleClose} component={RouterLink} to="/TeacherRegister">
              Teacher Register
            </MenuItem>
          </Menu>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
