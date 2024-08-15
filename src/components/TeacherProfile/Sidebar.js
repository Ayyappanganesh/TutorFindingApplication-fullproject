import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css'; // Ensure you have CSS for styling

const Sidebar = () => {
  return (
    <div className="sidebar-container-xyz">
      <div className="logo-container-abc">
        <img src="/path/to/logo.png" alt="Logo" className="logo-image-def" />
      </div>
      <nav className="nav-links-ghi">
        <Link to="/myaccount/myprofile" className="nav-link-jkl">Profile</Link>
        <Link to="/myaccount/mytuitions" className="nav-link-jkl">My Tuitions</Link>
        <Link to="/myaccount/myreview" className="nav-link-jkl">Review</Link>
      </nav>
    </div>
  );
};

export default Sidebar;
