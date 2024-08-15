// src/SelectedSubject.js

import React from 'react';
import './SelectedSubject.css'; // Import the CSS file for styling

const SelectedSubject = ({ Subject, delFunction }) => {
  return (
    <div className="selected-subject">
      <span>{Subject}</span>
      <button onClick={() => delFunction(Subject)}>Remove</button>
    </div>
  );
};

export default SelectedSubject;
