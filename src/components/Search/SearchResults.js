import React, { useState, useEffect } from 'react';
import TeacherList from './TeacherList';
import { useLocation } from 'react-router-dom';

const SearchResults = () => {
  const location = useLocation();
  const [teachers, setTeachers] = useState([]);

  // Mock data - replace this with an API call if needed
  const mockTeachers = [
    { id: 1, name: 'John Doe', subject: 'Math', board: 'CBSE', state: 'California', district: 'Los Angeles', standard: 'X' },
    { id: 2, name: 'Jane Smith', subject: 'Science', board: 'ICSE', state: 'New York', district: 'Manhattan', standard: 'IX' },
    { id: 3, name: 'Emily Johnson', subject: 'English', board: 'State', state: 'Texas', district: 'Houston', standard: 'VIII' },
    { id: 4, name: 'Michael Brown', subject: 'History', board: 'CBSE', state: 'Florida', district: 'Miami', standard: 'X' },
    { id: 5, name: 'Sarah Davis', subject: 'Math', board: 'ICSE', state: 'California', district: 'San Francisco', standard: 'VII' },
    // Add more mock teachers as needed
  ];

  useEffect(() => {
    // Fetch data based on search criteria if needed, using mock data for now
    const searchParams = new URLSearchParams(location.search);
    const name = searchParams.get('name');
    const subject = searchParams.get('subject');
    const board = searchParams.get('boards'); // Corrected this to singular "board"
    const state = searchParams.get('state');
    const district = searchParams.get('district');
    const standard = searchParams.get('std');

    // Filter mock data based on search criteria
    const filteredTeachers = mockTeachers.filter((teacher) => {
      return (
        (!name || teacher.name.toLowerCase().includes(name.toLowerCase())) &&
        (!subject || teacher.subject.toLowerCase().includes(subject.toLowerCase())) &&
        (!board || teacher.board === board) &&
        (!state || teacher.state === state) &&
        (!district || teacher.district === district) &&
        (!standard || teacher.standard === standard)
      );
    });

    setTeachers(filteredTeachers);
  }, [location.search]);

  return (
    <div className='search-results'>
      <TeacherList teachers={teachers} />
    </div>
  );
};

export default SearchResults;
