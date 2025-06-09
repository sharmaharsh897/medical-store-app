import React, { useState, useEffect, useContext } from "react";
import "./Testimonials.css";
import ownerImage from "../components/assets/owner.jpg"; // Ensure the correct path to the owner's image
import { UserContext } from "../context/userContext";
import reviews from "../data-access/reviews";

const Testimonials = () => {
  const { user } = useContext(UserContext);

  const StarRating = ({ rating, setRating }) => {
    return (
      <div className="star-rating">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={star <= rating ? "star filled" : "star"}
            onClick={() => setRating(star)}
          >
            ★
          </span>
        ))}
      </div>
    );
  };

  // State to hold customer reviews
  const [reviewsState, setReviews] = useState(reviews);

  // State to hold form input
  const [feedback, setFeedback] = useState("");
  const [name, setName] = useState("");
  const [rating, setRating] = useState(0);

  // State for managing visible reviews
  const [visibleReviews, setVisibleReviews] = useState(4); // Start with 6 reviews

  // UseEffect to load reviews from sessionStorage when component mounts
  useEffect(() => {
    if (user) {
      const fullName =
        user.first_name && user.last_name
          ? `${user.first_name} ${user.last_name}`
          : user.first_name || "";
      setName(fullName);
    }
  }, [user]);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (feedback && name) {
      // Get current date in a readable format
      const currentDate = new Date().toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      });

      // Add new feedback to the reviews list
      const newReviews = [
        ...reviewsState,
        { text: feedback, author: name, date: currentDate, rating: rating },
      ];
      setReviews(newReviews);

      // Save updated reviews to sessionStorage
      sessionStorage.setItem("reviews", JSON.stringify(newReviews));

      // Clear form input
      setFeedback("");
      setName("");
      setRating(0);
    }
  };

  // Handle "View More" button click
  const handleViewMore = () => {
    setVisibleReviews((prev) => prev + 2); // Increment visible reviews by 2
  };

  const handleViewLess = () => {
    setVisibleReviews(4); // Increment visible reviews by 2
  };

  const getRatingDistribution = () => {
    const distribution = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    reviewsState.forEach((review) => {
      if (review.rating >= 1 && review.rating <= 5) {
        distribution[review.rating]++;
      }
    });
    return distribution;
  };

  const ratingDistribution = getRatingDistribution();
  const maxRatingCount = Math.max(...Object.values(ratingDistribution));

  const getAverageRating = () => {
    const totalRatings = reviewsState.reduce(
      (sum, review) => sum + review.rating,
      0
    );
    return (totalRatings / reviewsState.length).toFixed(1); // To round the result to 1 decimal place
  };

  return (
    <div className="testimonials-container">
      {/* Store Description Section */}
      <div className="store-description">
        <h2>Gwalior's No. 1 Medical Store</h2>
        <p className="description">
          At <b>Gurudev Medical & Surgical</b>, established in 1975, we take
          pride in our 50 years of trust and commitment to delivering top-notch
          healthcare solutions. Our legacy of excellence is built on a
          deep-rooted presence in the community, offering a comprehensive range
          of high-quality pharmaceuticals, over-the-counter medications, and
          health products. Our knowledgeable and friendly staff are dedicated to
          providing expert advice and personalized care to ensure you and your
          family receive the best possible service. Trust us to be your reliable
          partner in health and wellness, where your well-being is our top
          priority.
        </p>
      </div>
      {/* Owner's Words Section */}
      <div className="owner-section">
        <h2>Some words from the owner</h2>
        <div className="owner-content">
          <img src={ownerImage} alt="Owner" className="owner-image" />
          <div className="owner-paragraph">
            <div className="quote-box">
              <span className="quote">“</span>
              <p>
                As the proud owner of Gurudev Medical & Surgical, I am deeply
                invested in ensuring that our store not only meets but exceeds
                your expectations. Our mission is rooted in providing you with
                exceptional healthcare products and personalized service that
                goes beyond the ordinary. We understand the importance of
                reliable medications and compassionate support in your health
                journey. My family and I are dedicated to maintaining the
                highest standards of quality and service, driven by our
                commitment to your well-being. We are grateful for your trust
                and loyalty, and we strive every day to be the trusted partner
                in your health and wellness.
              </p>
              <span className="owner-name">~ Lokesh Sharma</span>
            </div>
          </div>
        </div>
      </div>

      <div className="reviews-section">
        <h2>What our customers have to say:</h2>
        <div className="rating-summary">
          {/* Left Side (30%) */}
          <div className="left-side">
            <h3>Most trusted and chosen by customers</h3>
            <p className="average-rating">{getAverageRating()}</p>
            <p>Average Rating</p>
          </div>

          <div className="separator"></div>

          {/* Right Side (70%) */}
          <div className="right-side">
  {Object.entries(ratingDistribution)
    .reverse() // Reversing the order here
    .map(([stars, count]) => {
      const barWidth = (count / maxRatingCount) * 100;
      return (
        <div key={stars} className="rating-bar-row">
          <span className="rating-text">{stars} ★</span>
          <div className="bar">
            <div className="fill" style={{ width: `${barWidth}%` }}></div>
          </div>
          <span className="rating-text">({count})</span>
        </div>
      );
    })}
</div>

        </div>

        <div className="reviews-grid">
         {reviewsState
  .slice() // clone the array
  .sort((a, b) => new Date(b.date) - new Date(a.date)) // sort by date DESC
  .slice(0, visibleReviews)
  .map((review, index) => (
    <div key={index} className="review-box">
      <div className="review-stars">
        {"★".repeat(review.rating)}
        {"☆".repeat(5 - review.rating)}
      </div>
      <p className="review-text">“{review.text}”</p>
      <p className="review-author">
        {review.author},{" "}
        {new Date(review.date).toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "long",
          year: "numeric",
        })}
      </p>
    </div>
))}
        </div>

        <div className="reviews-buttons">
          {visibleReviews < reviewsState.length && (
            <button onClick={handleViewMore} className="view-more-btn">
              View More
            </button>
          )}
          {visibleReviews > 4 && (
            <button onClick={handleViewLess} className="view-less-btn">
              View Less
            </button>
          )}
        </div>
      </div>
      {/* Feedback Form Section */}
      <div className="feedback-form-section">
        <h2>Wanna say something about us?</h2>
        <form onSubmit={handleSubmit} className="feedback-form">
          <input
            type="text"
            className="feedback-name"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <textarea
            className="feedback-input"
            placeholder="Enter your feedback..."
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            required
          ></textarea>

          {/* Star Rating Input */}
          <StarRating rating={rating} setRating={setRating} />

          <button type="submit" className="feedback-submit">
            Post
          </button>
        </form>
      </div>
    </div>
  );
};

export default Testimonials;
