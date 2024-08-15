const mongoose = require('mongoose');

// Define the schema for reviews
const ReviewSchema = mongoose.Schema({
    // Rating given in the review, must be between 1 and 5
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: [true, 'Please provide rating']
    },
    // Reference to the Student who created the review
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'Student',
        required: true
    },
    // The text of the review
    review: {
        type: String,
        message: "Your review can't be empty",
        required: true,
        minLength: 1
    },
    // Reference to the Teacher being reviewed
    createdFor: {
        type: mongoose.Types.ObjectId,
        ref: 'Teacher',
        required: true
    },
    // Array of Students who liked the review
    like: {
        type: [mongoose.Types.ObjectId],
        ref: 'Student',
        default: []
    },
    // Array of Students who disliked the review
    dislike: {
        type: [mongoose.Types.ObjectId],
        ref: 'Student',
        default: []
    }
}, { timestamps: true }); // Automatically add createdAt and updatedAt fields

// Create a unique index for combination of createdBy and createdFor to prevent multiple reviews by the same student for the same teacher
ReviewSchema.index({ createdBy: 1, createdFor: 1 }, { unique: true });

// Static method to calculate and update the average rating and number of reviews for a teacher
ReviewSchema.statics.calculateAverageRating = async function (teacherId) {
    try {
        // Aggregate the ratings to calculate the average and total number of reviews
        const result = await this.aggregate([
            { $match: { createdFor: teacherId } },
            { $group: {
                _id: null,
                averageRating: { $avg: '$rating' },
                numOfReviews: { $sum: 1 }
            }}
        ]);

        // Update the Teacher document with the calculated average rating and number of reviews
        await this.model('Teacher').findOneAndUpdate(
            { _id: teacherId },
            {
                averageRating: Math.ceil(result[0]?.averageRating || 0), // Round up average rating
                numOfReviews: Math.ceil(result[0]?.numOfReviews || 0) // Round up number of reviews
            }
        );
    } catch (error) {
        // Log any errors that occur during the calculation
        console.error('Error calculating average rating:', error);
    }
};

// Middleware to recalculate average rating when a review is saved
ReviewSchema.post('save', async function () {
    // Calculate average rating for the teacher being reviewed
    await this.constructor.calculateAverageRating(this.createdFor);
});

// Middleware to recalculate average rating when a review is deleted
ReviewSchema.post('findOneAndDelete', async function(doc) {
    if (doc) {
        // Calculate average rating for the teacher whose review was deleted
        await mongoose.model('Review').calculateAverageRating(doc.createdFor);

    }
});



// Export the Review model
module.exports = mongoose.model('Review', ReviewSchema);