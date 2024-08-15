const mongoose = require('mongoose');

// Define the schema for tuitions
const TutionSchema = new mongoose.Schema({
    // Array of subjects for the tuition, must have at least one subject
    subjects: {
        type: [String],
        required: [true, 'At least provide one subject'],
        validate: {
            validator: function(v) {
                return v.length > 0; // Validate that the array contains at least one subject
            },
            message: 'Subject array must have at least one subject'
        }
    },
    // Duration of the tuition, must contain start and end timings
    duration: {
        type: [String],
        required: [true, 'Please provide timings'],
        validate: {
            validator: function(v) {
                return v.length === 2; // Validate that the array contains exactly two elements (start and end timings)
            },
            message: 'Timings must contain start and end values'
        }
    },
    // Days of the week for the tuition, must contain start and end days
    days: {
        type: [String],
        required: [true, 'Please provide tuition days'],
        validate: {
            validator: function(v) {
                return v.length === 2; // Validate that the array contains exactly two elements (start and end days)
            },
            message: 'Days must contain start and end days'
        }
    },
    // Standards covered in the tuition, must contain starting and ending standards
    standard: {
        type: [String],
        required: [true, 'Please provide standard details'],
        validate: {
            validator: function(v) {
                return v.length === 2; // Validate that the array contains exactly two elements (starting and ending standards)
            },
            message: 'Standards must contain starting and ending standard'
        }
    },
    // Fees for the tuition, required field
    fees: {
        type: Number,
        required: [true, 'Please provide fees details']
    },
    // Array of boards for which the tuition is applicable, must have at least one board
    boards: {
        type: [String],
        required: [true, 'Please provide board details'],
        validate: {
            validator: function(v) {
                return v.length > 0; // Validate that the array contains at least one board
            },
            message: 'Boards array must have at least one board'
        }
    },
    // Reference to the teacher who is conducting the tuition
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'Teacher',
        required: [true, 'Please provide a teacher']
    }
});

// Export the Tution model
module.exports = mongoose.model('Tution', TutionSchema);
