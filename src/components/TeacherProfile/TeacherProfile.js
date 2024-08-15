import React, { useState } from 'react';
import './TeacherProfile.css';
import '@fortawesome/fontawesome-free/css/all.min.css'; // Ensure this is correctly imported

const backgroundImage = 'https://img.freepik.com/free-vector/circles-background-dark-tones_60389-166.jpg?ga=GA1.1.711888986.1720101620&semt=ais_user'; // Example background image URL

const initialReviews = [
  { id: 1, text: 'This teacher is amazing!', likeCount: 0, dislikeCount: 0, activeRating: null },
  { id: 2, text: 'Great teaching methods.', likeCount: 0, dislikeCount: 0, activeRating: null }
];

const TeacherProfile = () => {
  const [reviews, setReviews] = useState(initialReviews);
  const [newReviewText, setNewReviewText] = useState('');

  const handleRatingClick = (reviewId, rating) => {
    setReviews(reviews.map(review => {
      if (review.id === reviewId) {
        let newLikeCount = review.likeCount;
        let newDislikeCount = review.dislikeCount;

        if (rating === 'like') {
          newLikeCount += 1;
        } else if (rating === 'dislike') {
          newDislikeCount += 1;
        }

        return {
          ...review,
          likeCount: newLikeCount,
          dislikeCount: newDislikeCount,
          activeRating: review.activeRating === rating ? null : rating
        };
      }
      return review;
    }));
  };

  const handleSubmitReview = () => {
    if (newReviewText.trim()) {
      const newReview = {
        id: reviews.length + 1,
        text: newReviewText,
        likeCount: 0,
        dislikeCount: 0,
        activeRating: null
      };
      setReviews([...reviews, newReview]);
      setNewReviewText('');
    }
  };

  return (
    <div className="profile-page" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className="profile-container">
        <div className="profile-header">
          <div className="profile-picture">
            {/* Add profile picture here */}
          </div>
          <h1>Kamil Rahuman M</h1>
        </div>
        <div className="profile-details">
          <div className="label">Name</div>
          <div className="value">Kamil Rahuman M</div>
          
          <div className="label">Subject Handling</div>
          <div className="value">Cyber Security</div>
          
          <div className="label">Board</div>
          <div className="value">CBSE, TNSB, KRSB, etc.</div>
          
          <div className="label">Teaching Language</div>
          <div className="value">Tamil, English</div>
          
          <div className="label">Standard Handling</div>
          <div className="value">For All</div>
          
          <div className="label">Years of Experience</div>
          <div className="value">5</div>
        </div>
        <div className="about-teacher">
          <p className="about-theading">About</p>
          <p className="about-tcontent">Security Researcher | Bug Bounty Hunter | THM Top 2% |🏅Secured Microsoft, NASA, United Nations, U.S Department of Homeland Security, Indian Government +21 More Companies🌟</p>
        </div>
        <div className="reviews-container">
          <h3 className="reviews-heading">Student Reviews</h3>
          <div className="reviews-section">
            {reviews.map(review => (
              <div className="review" key={review.id}>
                <div className="review-picture">
                  {/* Add reviewer picture here */}
                </div>
                <div className="review-text">
                  <p>{review.text}</p>
                  <div className="rating">
                    <div 
                      className={`like ${review.activeRating === 'like' ? 'active' : ''}`} 
                      onClick={() => handleRatingClick(review.id, 'like')}
                    >
                      <i className="fas fa-thumbs-up fa-3x"></i>
                      <span className="count">{review.likeCount}</span>
                    </div>
                    <div 
                      className={`dislike ${review.activeRating === 'dislike' ? 'active' : ''}`} 
                      onClick={() => handleRatingClick(review.id, 'dislike')}
                    >
                      <i className="fas fa-thumbs-down fa-3x"></i>
                      <span className="count">{review.dislikeCount}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="write-review">
            <textarea 
              value={newReviewText}
              onChange={(e) => setNewReviewText(e.target.value)}
              placeholder="Write review..."
            ></textarea>
            <button className="submit-button" onClick={handleSubmitReview}>Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherProfile;
