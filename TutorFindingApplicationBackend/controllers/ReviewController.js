// Import required modules and classes
const Review = require('../models/ReviewModel') // Mongoose model for Review
const Student = require('../models/StudentModel') // Mongoose model for Student
const Teacher = require('../models/TeacherModel') // Mongoose model for Teacher
const { StatusCodes } = require('http-status-codes') // HTTP status codes for response

// Function to get all reviews about a Teacher or Student
const getReviews = async (req, res) => {
    const { id } = req.params; // Extract ID from request parameters
    const { mode } = req.query; // Extract mode (student or teacher) from query parameters
    const dest = mode === 'student' ? 'createdBy' : 'createdFor'; // Determine whether to search by createdBy or createdFor based on mode
    console.log(id, mode, dest);

    try {
        // Find reviews based on the destination field and populate with the name of the referenced entity
        const reviews = await Review.find({ [dest]: id }).populate({
            path: dest === 'student' ? 'createdFor' : 'createdBy',
            select: 'name profilepic'
        });
        
        // Send a 200 OK response with the found reviews
        res.status(StatusCodes.OK).json({ reviews });
    } catch (error) {
        // If an error occurs, send a 500 Internal Server Error response with the error message
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
}

// Function to create a new review
const createReview = async (req, res) => {
    console.log(req.body);
    const { createdBy, createdFor } = req.body; // Extract createdBy and createdFor IDs from request body

    // Find the student and teacher by their IDs
    const user = await Student.findById({ _id: createdBy });
    const teacher = await Teacher.findById({ _id: createdFor });

    // If the student or teacher is not found, send a 404 Not Found response
    if (!user) {
        return res.status(StatusCodes.NOT_FOUND).json({ message: `The student with id ${createdBy} does not exist` });
    }
    if (!teacher) {
        return res.status(StatusCodes.NOT_FOUND).json({ message: `The teacher with id ${createdFor} does not exist` });
    }

    // Check if a review has already been submitted by the same student for the same teacher
    const alreadySubmitted = await Review.findOne({
        createdBy: createdBy,
        createdFor: createdFor
    });

    if (alreadySubmitted) {
        // If review already exists, send a 400 Bad Request response
        return res.status(StatusCodes.BAD_REQUEST).json({ message: `The review has already been submitted` });
    } else {
        // If review does not exist, create a new review
        const review = await Review.create(req.body);
        // Send a 201 Created response with the created review
        res.status(StatusCodes.CREATED).json({ review });
    }
}

// Function to delete a review by its ID
const deleteReview = async (req, res) => {
    const { id } = req.params; // Extract ID from request parameters

    // Find the review by ID
    const review = await Review.findById({ _id: id });

    if (!review) {
        // If review is not found, send a 404 Not Found response
        return res.status(StatusCodes.NOT_FOUND).json({ message: `No review with id ${id} exists` });
    } else {
        // If review is found, delete it by ID
        await Review.findByIdAndDelete({ _id: id });
        // Send a 200 OK response indicating successful deletion
        res.status(StatusCodes.OK).json({ message: `Review with id ${id} deleted successfully` });
    }
}

// Function to update a review by its ID
const updateReview = async (req, res) => {
    const { id } = req.params; // Extract ID from request parameters

    // Find and update the review by ID with new data from request body
    let review = await Review.findByIdAndUpdate({ _id: id }, req.body, { new: true, runValidators: true });

    if (!review) {
        // If review is not found, send a 404 Not Found response
        return res.status(StatusCodes.NOT_FOUND).json({ message: `No review with id ${id} exists` });
    } else {
        // If review is found and updated, send a 200 OK response with the updated review
        return res.status(StatusCodes.OK).json({ review });
    }
}

// Export the functions to be used in other parts of the application
module.exports = {
    getReviews,
    createReview,
    deleteReview,
    updateReview
};
