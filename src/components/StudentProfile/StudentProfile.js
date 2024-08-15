import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './StudentProfile.css';

const StudentProfile = () => {
  const { studentName } = useParams(); // Assuming name is passed as a URL parameter
  const navigate = useNavigate();
  const [location, setLocation] = useState('');

  // Mock data for demonstration purposes
  const studentDetails = {
    standard: "10th Grade",
    subjects: ["Mathematics", "Science", "English"],
    school: "Springfield High School",
    location: "coimbatore",
  };

  const teachers = [
    {
      id: 1,
      name: "John Doe",
      subjects: ["Mathematics", "Physics"],
      location: "Coimbatore",
      rating: 4.5,
    },
    {
      id: 2,
      name: "Jane Smith",
      subjects: ["English", "History"],
      location: "Chennai",
      rating: 4.7,
    },
    {
      id: 3,
      name: "Albert Johnson",
      subjects: ["Chemistry", "Biology"],
      location: "Salem",
      rating: 4.8,
    },
    {
      id: 4,
      name: "Emily Davis",
      subjects: ["Mathematics", "Computer Science"],
      location: "Chennai",
      rating: 4.9,
    },
    {
      id: 5,
      name: "Michael Brown",
      subjects: ["Economics", "Geography"],
      location: "Chennai",
      rating: 4.6,
    },
    {
      id: 6,
      name: "Sophia Taylor",
      subjects: ["Physics", "Chemistry"],
      location: "Madurai",
      rating: 4.7,
    },
    {
      id: 7,
      name: "Daniel Wilson",
      subjects: ["Biology", "Mathematics"],
      location: "Tiruchirappalli",
      rating: 4.8,
    },
    {
      id: 8,
      name: "Olivia Brown",
      subjects: ["English", "Social Science"],
      location: "Tirunelveli",
      rating: 4.9,
    },
    {
      id: 9,
      name: "James Anderson",
      subjects: ["Economics", "History"],
      location: "Vellore",
      rating: 4.5,
    },
    {
      id: 10,
      name: "Isabella Moore",
      subjects: ["Computer Science", "Mathematics"],
      location: "Erode",
      rating: 4.6,
    },
    {
      id: 11,
      name: "Ethan Thomas",
      subjects: ["Physics", "Mathematics"],
      location: "Thanjavur",
      rating: 4.8,
    },
    {
      id: 12,
      name: "Amelia Jackson",
      subjects: ["Biology", "Chemistry"],
      location: "Kanyakumari",
      rating: 4.7,
    },
    {
      id: 13,
      name: "Mason White",
      subjects: ["History", "Political Science"],
      location: "Theni",
      rating: 4.6,
    },
    {
      id: 14,
      name: "Charlotte Harris",
      subjects: ["Economics", "Mathematics"],
      location: "Dindigul",
      rating: 4.9,
    },
    {
      id: 15,
      name: "Benjamin Martin",
      subjects: ["Chemistry", "Physics"],
      location: "Tiruvannamalai",
      rating: 4.7,
    },
    {
      id: 16,
      name: "Mia Thompson",
      subjects: ["English", "Geography"],
      location: "Karur",
      rating: 4.5,
    },
    {
      id: 17,
      name: "Lucas Lee",
      subjects: ["Mathematics", "Physics"],
      location: "Salem",
      rating: 4.8,
    },
    {
      id: 18,
      name: "Emma King",
      subjects: ["Biology", "Computer Science"],
      location: "Coimbatore",
      rating: 4.9,
    },
    {
      id: 19,
      name: "Henry Walker",
      subjects: ["History", "Political Science"],
      location: "Coimbatore",
      rating: 4.6,
    },
    {
      id: 20,
      name: "Ava Scott",
      subjects: ["Economics", "Mathematics"],
      location: "Chennai",
      rating: 4.7,
    },
  ];
  

  const handleSearchClick = () => {
    const filteredTeachers = teachers.filter(teacher => teacher.location === location);
    navigate('/searchpage', { state: { teachers: filteredTeachers } }); // Pass filtered teachers to search page
  };

  return (
    <div className="student-profile-container">
      <h1 className="student-profile-title">Student Profile</h1>
      <div className="student-profile-details">
        <p><strong>Name:</strong> {studentName}</p>
        <p><strong>Standard:</strong> {studentDetails.standard}</p>
        <p><strong>Subjects:</strong> {studentDetails.subjects.join(', ')}</p>
        <p><strong>School:</strong> {studentDetails.school}</p>
        <p><strong>Location:</strong> {studentDetails.location}</p>
      </div>
      <div className="student-profile-search">
        <input
          type="text"
          placeholder="Enter location"
          className="student-profile-search-input"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <button
          onClick={handleSearchClick}
          className="student-profile-search-button"
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default StudentProfile;
