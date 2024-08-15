const express = require('express');
const router = express.Router();

const {
  getTeacher,
  updateTeacher,
  deleteTeacher,
  createTeacher
} = require('../controllers/TeacherController');

// Route for creating a new teacher
router.route('/')
  .post(createTeacher);

// Routes for handling teacher-specific operations by ID
router.route('/:id')
  .get(getTeacher)    // Get details of a teacher by ID
  .patch(updateTeacher)  // Update teacher details by ID
  .delete(deleteTeacher); // Delete teacher by ID

module.exports = router;
