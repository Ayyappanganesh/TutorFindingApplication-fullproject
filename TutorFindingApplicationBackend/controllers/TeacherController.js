// Import required modules and classes
const Teacher = require('../models/TeacherModel'); // Mongoose model for Teacher
const { StatusCodes } = require('http-status-codes'); // HTTP status codes for response
const { uploadImg } = require('./StudentController'); // Importing uploadImg function from StudentController

// Function to get a teacher by their ID
const getTeacher = async (req, res) => {
    const { id } = req.params; // Extract teacher ID from request parameters
    const teacher = await Teacher.findById({ _id: id }); // Find teacher by ID

    if (!teacher) {
        // If teacher is not found, send a 404 Not Found response
        res.status(StatusCodes.NOT_FOUND).json({ message: `Teacher with id ${id} not found` });
    } else {
        // If teacher is found, send a 200 OK response with the teacher data
        res.status(StatusCodes.OK).json({ teacher });
    }
};

// Function to update a teacher's information
const updateTeacher = async (req, res) => {
    console.log("Incoming"); // Log incoming request for debugging
    const { id } = req.params; // Extract teacher ID from request parameters

    // Find and update the teacher by ID with new data from the request body
    let teacher = await Teacher.findByIdAndUpdate({ _id: id }, req.body, { new: true, runValidators: true });

    if (!teacher) {
        // If teacher is not found, send a 404 Not Found response
        res.status(StatusCodes.NOT_FOUND).json({ message: `Teacher with id ${id} not found` });
    } else {
        // Remove sensitive information before sending the response
        delete teacher.password;
        delete teacher.numOfReviews;
        delete teacher.numOfTutions;
        delete teacher.averageRating;

        // Send a 200 OK response with the updated teacher data
        res.status(StatusCodes.OK).json({ teacher });
    }
};

// Function to delete a teacher by their ID
const deleteTeacher = async (req, res) => {
    const { id } = req.params; // Extract teacher ID from request parameters

    // Find the teacher by ID
    const teacher = await Teacher.findOne({ _id: id });
    if (!teacher) {
        // If teacher is not found, send a 404 Not Found response
        return res.status(StatusCodes.NOT_FOUND).json({ message: `Teacher with id ${id} not found` });
    }

    try {
        // Attempt to delete the teacher record
        await teacher.deleteOne();
    } catch (error) {
        // Log and send error message if deletion fails
        console.log("Error deleting the teacher");
        console.log(error.message);
    }

    // Send a 200 OK response indicating the teacher was deleted successfully
    res.status(StatusCodes.OK).json({ message: `Teacher with id ${id} deleted successfully` });
};

// Function to create a new teacher
const createTeacher = async (req, res) => {
    try {
        // Add a custom 'about' field to the request body
        req.body.about = "Hi I am " + req.body.name;

        // Create a new teacher with the provided data
        let teacher = await Teacher.create(req.body);

        // Convert Mongoose document to a plain object if needed
        teacher = teacher.toObject();
        
        // Remove sensitive information before sending the response
        delete teacher.password;

        console.log(teacher); // Log teacher data for debugging

        // Send a 201 Created response with the newly created teacher data
        res.status(StatusCodes.CREATED).json({ teacher });
    } catch (error) {
        // Log and send error message if creation fails
        console.error('Error creating teacher:', error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Failed to create teacher' });
    }
};

// Export functions to be used in other parts of the application
module.exports = {
    getTeacher,
    updateTeacher,
    deleteTeacher,
    createTeacher
};
