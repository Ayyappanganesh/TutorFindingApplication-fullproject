// Import required modules and classes
const StudentController = require('./StudentController') // Controller for student operations
const TeacherController = require('./TeacherController') // Controller for teacher operations
const { StatusCodes } = require('http-status-codes') // HTTP status codes for response
const Student = require('../models/StudentModel') // Mongoose model for Student
const Teacher = require('../models/TeacherModel') // Mongoose model for Teacher

// Function to handle student registration
const registerStudent = async (req, res) => {
    try {
        // Call the createStudent method from StudentController to register a new student
        await StudentController.createStudent(req, res); 
    } catch (error) {
        // If an error occurs, send a 500 Internal Server Error response with the error message
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
};

// Function to handle teacher registration
const registerTeacher = async (req, res) => {
    try {
        // Call the createTeacher method from TeacherController to register a new teacher
        await TeacherController.createTeacher(req, res); 
    } catch (error) {
        // If an error occurs, send a 500 Internal Server Error response with the error message
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
};

// Function to handle student login
const loginStudent = async (req, res) => {
    const { email, password } = req.query // Extract email and password from the request body

    console.log(email , password);

    // Check if both email and password are provided
    if (!password || !email) {
        console.log('Not exists')
        return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Email and password are required' });
    }

    // Find the student with the provided email
    let student = await Student.findOne({ email: email });

    // If no student is found, return a 401 Unauthorized response
    if (!student) {
        console.log('Student chk')
        return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Account not yet registered' });
    }

    // Check if the provided password is correct
    const isPasswordCorrect = await student.comparePassword(password);

    // If the password is incorrect, return a 401 Unauthorized response
    if (!isPasswordCorrect) {
        console.log('Password chk')
        return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Incorrect password' });
    }

    // If the login is successful, return a 200 OK response with the student object
    student = await Student.findById(student._id).select('-password -__v')
    return res.status(StatusCodes.OK).json({ student });
};

// Function to handle teacher login
const loginTeacher = async (req, res) => {
    const { email, password } = req.query // Extract email and password from the request body

    console.log(email , password);

    // Check if both email and password are provided
    if (!password || !email) {
        return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Email and password are required' });
    }

    // Find the teacher with the provided email
    let teacher = await Teacher.findOne({ email: email });

    // If no teacher is found, return a 401 Unauthorized response
    if (!teacher) {
        return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Account not yet registered' });
    }

    // Check if the provided password is correct
    const isPasswordCorrect = await teacher.comparePassword(password);

    // If the password is incorrect, return a 401 Unauthorized response
    if (!isPasswordCorrect) {
        return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Incorrect password' });
    }

    // If the login is successful, return a 200 OK response with the teacher object
    teacher = await Teacher.findById(teacher._id).select('-password -__v')
    return res.status(StatusCodes.OK).json({ teacher });
};

// Export the functions to be used in other parts of the application
module.exports = {
    registerStudent,
    registerTeacher,
    loginStudent,
    loginTeacher
};
