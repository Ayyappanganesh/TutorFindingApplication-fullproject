const express = require('express');
const router = express.Router();

const {
  getReviews,
  createReview,
  updateReview,
  deleteReview
} = require('../controllers/ReviewController');

// Route for creating a review
router.route('/')
  .post(createReview);

// Routes for individual review operations
router.route('/:id')
  .get(getReviews)   // Fetches a review by ID
  .delete(deleteReview)  // Deletes a review by ID
  .patch(updateReview);  // Updates a review by ID

module.exports = router;
