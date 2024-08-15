const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Define the schema for teachers
const TeacherSchema = mongoose.Schema({
    // URL of the teacher's profile picture
    profilepic: {
        type: String,
        default: 'https://res.cloudinary.com/diokpb3jz/image/upload/v1722887830/samples/s8yfrhetwq1s4ytzwo39.png'
    },
    // Teacher's name, required field
    name: {
        type: String,
        required: [true, 'Please provide a name']
    },
    // Teacher's email, required and must be unique
    email: {
        type: String,
        required: [true, 'Please provide an email'],
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Please provide a valid email',
        ],
        unique: true
    },
    // Teacher's password, required and must be at least 6 characters long
    password: {
        type: String,
        required: [true, 'Please provide a password'],
        minLength: 6
    },
    // Teacher's qualification, required field
    qualification: {
        type: String,
        required: [true, "Please provide a qualification"]
    },
    // Teacher's mobile number, must be exactly 10 digits
    mobileno: {
        type: String,
        required: [true, "Please provide a contact number"],
        validate: {
            validator: function(v) {
                return v.length === 10; // Validate that mobile number has exactly 10 digits
            },
            message: 'Please provide a valid number'
        }
    },
    // State where the teacher is located, required field
    state: {
        type: String,
        required: [true, "Please provide a state"]
    },
    // District where the teacher is located, required field
    district: {
        type: String,
        required: [true, "Please provide a district"]
    },
    // Number of years of experience, required field
    year_of_exp: {
        type: Number,
        required: [true, "Please provide experience"]
    },
    // Array of subjects the teacher can teach, required and must contain at least one subject
    subjects: {
        type: [String],
        required: [true, "Please provide a subject"],
        validate: {
            validator: function(v) {
                return v.length > 0; // Validate that at least one subject is provided
            },
            message: 'Please provide at least one subject'
        }
    },
    // A brief description about the teacher
    about: {
        type: String,
        minLength: 5 // Minimum length of the description
    },
    // Average rating of the teacher, default is 0
    averageRating: {
        type: Number,
        default: 0
    },
    // Number of reviews the teacher has received, default is 0
    numOfReviews: {
        type: Number,
        default: 0
    },
    // Number of tutions the teacher is providing, default is 0
    numOfTutions: {
        type: Number,
        default: 0
    }
});

// Virtual field to populate reviews associated with the teacher
TeacherSchema.virtual('reviews', {
    ref: 'Review', // Model to use for population
    localField: '_id', // Field in the Teacher model
    foreignField: 'createdFor', // Field in the Review model
    justOne: false // This will return an array of reviews
});

// Pre-delete middleware to remove associated reviews and tutions
TeacherSchema.pre('deleteOne', async function(next) {
    console.log("Executing before delete One");

    const conditions = this.getQuery(); // Get conditions used in the delete operation

    const doc = await mongoose.model('Teacher').findOne(conditions); // Find the document to be deleted

    // Delete associated reviews and tutions
    await mongoose.model('Review').deleteMany({ createdFor: doc._id });
    await mongoose.model('Tution').deleteMany({ createdBy: doc._id });

    next(); // Proceed with the delete operation
});

// Pre-save middleware to hash the password before saving
TeacherSchema.pre('save', async function(next) {
    if (this.isModified('password')) { // Only hash the password if it has been modified
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    }
    next(); // Proceed with the save operation
});

// Method to compare a candidate password with the stored hashed password
TeacherSchema.methods.comparePassword = async function(candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

// Export the Teacher model
module.exports = mongoose.model('Teacher', TeacherSchema);
