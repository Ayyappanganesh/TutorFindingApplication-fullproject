const express = require('express');
const router = express.Router();

const {
  uploadImg,
  favouriteTutions,
  getStudent,
  createStudent,
  deleteStudent,
  updateStudent,
  likereviews
} = require('../controllers/StudentController');

// Route for creating a new student
router.route('/')
  .post(createStudent);

// Route for uploading images
router.route('/upload')
  .post(uploadImg);

router.route('/favouritetutions/:id')
    .post(favouriteTutions)

router.route('/likereviews/:id')
    .post(likereviews)


// Routes for handling student-specific operations
router.route('/:id')
      // Might consider changing this to a different HTTP method if it's not a resource creation
  .get(getStudent)
  .delete(deleteStudent)
  .patch(updateStudent);

module.exports = router;
