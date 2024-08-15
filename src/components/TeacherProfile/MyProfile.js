import React, { useState } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css'; // Ensure this is correctly imported
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import './MyProfile.css';

const MyProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: 'Smith',
    subjectHandling: 'Cyber Security',
    board: 'CBSE, TNSB, KRSB, etc.',
    teachingLanguage: 'Tamil, English',
    standardHandling: 'For All',
    experience: '5',
    about: 'Security Researcher | Bug Bounty Hunter | THM Top 2% |🏅Secured Microsoft, NASA, United Nations, U.S Department of Homeland Security, Indian Government +21 More Companies🌟'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const handleSaveClick = () => {
    // Add save logic here
    setIsEditing(false);
  };

  return (
    <div className="my-profile-page-cust">
      <div className="my-profile-container-cust">
        <div className="my-profile-header-cust">
          <div className="my-profile-picture-cust">
            {/* Add profile picture here */}
          </div>
          <h1>{profile.name}</h1>
        </div>
        <div className="my-profile-details-cust">
          <div className="my-label-cust">Name</div>
          {isEditing ? (
            <input
              className="my-value-cust"
              name="name"
              value={profile.name}
              onChange={handleChange}
            />
          ) : (
            <div className="my-value-cust">{profile.name}</div>
          )}

          <div className="my-label-cust">Subject Handling</div>
          {isEditing ? (
            <input
              className="my-value-cust"
              name="subjectHandling"
              value={profile.subjectHandling}
              onChange={handleChange}
            />
          ) : (
            <div className="my-value-cust">{profile.subjectHandling}</div>
          )}

          <div className="my-label-cust">Board</div>
          {isEditing ? (
            <input
              className="my-value-cust"
              name="board"
              value={profile.board}
              onChange={handleChange}
            />
          ) : (
            <div className="my-value-cust">{profile.board}</div>
          )}

          <div className="my-label-cust">Teaching Language</div>
          {isEditing ? (
            <input
              className="my-value-cust"
              name="teachingLanguage"
              value={profile.teachingLanguage}
              onChange={handleChange}
            />
          ) : (
            <div className="my-value-cust">{profile.teachingLanguage}</div>
          )}

          <div className="my-label-cust">Standard Handling</div>
          {isEditing ? (
            <input
              className="my-value-cust"
              name="standardHandling"
              value={profile.standardHandling}
              onChange={handleChange}
            />
          ) : (
            <div className="my-value-cust">{profile.standardHandling}</div>
          )}

          <div className="my-label-cust">Years of Experience</div>
          {isEditing ? (
            <input
              className="my-value-cust"
              name="experience"
              value={profile.experience}
              onChange={handleChange}
            />
          ) : (
            <div className="my-value-cust">{profile.experience}</div>
          )}
        </div>
        <div className="my-about-section-cust">
          <p className="my-about-heading-cust">About</p>
          {isEditing ? (
            <textarea
              className="my-about-content-cust"
              name="about"
              value={profile.about}
              onChange={handleChange}
            />
          ) : (
            <p className="my-about-content-cust">{profile.about}</p>
          )}
        </div>
        <button className="my-edit-prof-btn-cust" onClick={isEditing ? handleSaveClick : handleEditClick}>
          <div className={`my-itms-cntr-cust style-links ${isEditing ? 'edit-styl-cust' : 'norm-style-cust'}`}>
            {isEditing ? <SaveIcon /> : <EditIcon />}
            <p className="my-icon-para-cust">{isEditing ? 'Save Profile' : 'Edit Profile'}</p>
          </div>
        </button>
      </div>
    </div>
  );
};

export default MyProfile;
