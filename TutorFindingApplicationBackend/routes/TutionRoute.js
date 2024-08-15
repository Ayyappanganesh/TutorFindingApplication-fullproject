const express = require('express');
const router = express.Router();

const {
  getTution,
  getTutionsWithCondition,
  getAllTutions,
  createTution,
  updateTution,
  deleteTution
} = require('../controllers/TutionController');

// Routes for tuition-related operations
router.route('/')
  .get(getTutionsWithCondition)  // Get tutions with filtering conditions
  .post(createTution);           // Create a new tuition

router.route('/gettutions/:id')
   .get(getTution)

router.route('/:id')
  .get(getAllTutions)            // Get all tutions by user ID
  .delete(deleteTution)          // Delete a specific tuition by ID
  .patch(updateTution);          // Update a specific tuition by ID

module.exports = router;
