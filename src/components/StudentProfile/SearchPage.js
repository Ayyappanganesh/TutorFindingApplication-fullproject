import React from 'react';
import './SearchPage.css';
import { useLocation } from 'react-router-dom';

const SearchPage = () => {
  const location = useLocation();
  const { teachers } = location.state || { teachers: [] };

  return (
    <div className='search-wrap'>

    <div className="search-page-container">
      <h1>Available Teachers</h1>
      {teachers.length > 0 ? (
        <ul>
          {teachers.map(teacher => (
            <li key={teacher.id}>
              <h3>{teacher.name}</h3>
              <p>Subjects: {teacher.subjects.join(', ')}</p>
              <p>Location: {teacher.location}</p>
              <p>Rating: {teacher.rating}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No teachers found for the specified location.</p>
      )}
    </div>
      </div>
  );
};

export default SearchPage;
