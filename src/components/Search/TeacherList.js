// TeacherList.js
import React from 'react';
import './TeacherList.css'; // Create a CSS file for styling

const TeacherList = ({ teachers }) => {
  return (
    <div className='teacher-list'>
      {teachers.length > 0 ? (
        teachers.map((teacher) => (
          <div key={teacher.id} className='teacher-card'>
            <h3>{teacher.name}</h3>
            <p>Subject: {teacher.subject}</p>
            <p>Board: {teacher.board}</p>
            <p>State: {teacher.state}</p>
            <p>District: {teacher.district}</p>
            <p>Standard: {teacher.standard}</p>
          </div>
        ))
      ) : (
        <p>No teachers found based on the search criteria.</p>
      )}
    </div>
  );
};

export default TeacherList;
