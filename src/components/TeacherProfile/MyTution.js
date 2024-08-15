import React, { useState } from 'react';
import './MyTution.css';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import SaveIcon from '@mui/icons-material/Save';


const MyTution = () => {
    const navigate = useNavigate()
  const [tutions, setTutions] = useState([
    { subjects: 'Maths, Science', time: '8:30 AM - 9:30 AM', day: 'Tuesday - Saturday', board: 'CSE, ICSE', fees: '₹500' },
    { subjects: 'Maths, Science', time: '8:30 AM - 9:30 AM', day: 'Tuesday - Saturday', board: 'CSE, ICSE', fees: '₹500' },
    { subjects: 'Maths, Science', time: '8:30 AM - 9:30 AM', day: 'Tuesday - Saturday', board: 'CSE, ICSE', fees: '₹500' },
    { subjects: 'Maths, Science', time: '8:30 AM - 9:30 AM', day: 'Tuesday - Saturday', board: 'CSE, ICSE', fees: '₹500' },
  ]);

  const [editIndex, setEditIndex] = useState(null);

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    setTutions((prevTutions) => {
      const newTutions = [...prevTutions];
      newTutions[index] = { ...newTutions[index], [name]: value };
      return newTutions;
    });
  };

  const handleEditClick = (index) => {
    setEditIndex(index);
  };

  const handleSaveClick = (index) => {
    setEditIndex(null);
    // Add save logic here if needed
  };

  const handleDeleteClick = (index) => {
    setTutions((prevTutions) => prevTutions.filter((_, i) => i !== index));
  };

  return (
    <div className='my-tution-container'>
      <h1>Your Tutions</h1>
      <div className='my-tutions'>
        {tutions.map((tution, index) => (
          <div className="tutor-card" key={index}>
            <div className="card-details">
              <p><strong>Subjects:</strong> {editIndex === index ? <input name="subjects" value={tution.subjects} onChange={(e) => handleChange(e, index)} /> : tution.subjects}</p>
              <p><strong>Time:</strong> {editIndex === index ? <input name="time" value={tution.time} onChange={(e) => handleChange(e, index)} /> : tution.time}</p>
              <p><strong>Day:</strong> {editIndex === index ? <input name="day" value={tution.day} onChange={(e) => handleChange(e, index)} /> : tution.day}</p>
              <p><strong>Board:</strong> {editIndex === index ? <input name="board" value={tution.board} onChange={(e) => handleChange(e, index)} /> : tution.board}</p>
              <p><strong>Fees:</strong> {editIndex === index ? <input name="fees" value={tution.fees} onChange={(e) => handleChange(e, index)} /> : tution.fees}</p>
            </div>
            <div className='tution-options'>
              {editIndex === index ? (
                <button className='edit-prof-btn spz' onClick={() => handleSaveClick(index)}>
                  <div className='itms-cntr style-links sv-bck'>
                    <SaveIcon />
                    <p>Save</p>
                  </div>
                </button>
              ) : (
                <button className='edit-prof-btn spz' onClick={() => handleEditClick(index)}>
                  <div className='itms-cntr style-links ed-bck'>
                    <EditIcon />
                    <p>Edit</p>
                  </div>
                </button>
              )}
              <button className='edit-prof-btn spz' onClick={() => handleDeleteClick(index)}>
                <div className='itms-cntr style-links del-bck'>
                  <DeleteIcon />
                  <p>Delete</p>
                </div>
              </button>
            </div>
          </div>
        ))}
      </div>
      <div>
      <button className='edit-prof-btn spz' onClick={()=>navigate('/myaccount/addtution')}>
                <div className='itms-cntr style-links add-tut-bck'>
                  <AddIcon />
                  <p>Add Tution</p>
                </div>
      </button>
      </div>
    </div>
  );
}

export default MyTution;
