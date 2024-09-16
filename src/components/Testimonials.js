import React, { useState, useEffect } from 'react';
import './Testimonials.css';
import ownerImage from '../components/assets/owner.jpg'; // Ensure the correct path to the owner's image

const Testimonials = () => {
  // State to hold customer reviews
  const [reviews, setReviews] = useState([
    { text: "I’ve been a regular customer at Gwalior’s No. 1 Medical Store for years, and I’m always impressed by their professionalism and friendly service. They have a great selection of products, and their staff is always ready to help with any questions. Highly recommended!", author: "Priya Sharma", date: "10 August 2023" },
    { text: "This is my go-to pharmacy for all my family’s needs. The quality of their medicines and the knowledgeable staff make a huge difference. I appreciate their dedication to customer care and the quick service they provide.", author: "Rajesh Patel", date: "22 July 2023" },
    { text: "Gwalior’s No. 1 Medical Store has always exceeded my expectations. Their staff is not only courteous but also very attentive, ensuring I get the right products every time. It’s reassuring to have such a reliable place for all my health needs.", author: "Anita Verma", date: "15 September 2023" },
    { text: "Fantastic service and a great range of products. The team at this store is incredibly helpful and makes sure I leave with everything I need. I wouldn’t trust my health needs to anyone else!", author: "Suresh Kumar", date: "5 June 2023" }
  ]);

  // State to hold form input
  const [feedback, setFeedback] = useState("");
  const [name, setName] = useState("");

  // State for managing visible reviews
  const [visibleReviews, setVisibleReviews] = useState(4); // Start with 6 reviews

  // UseEffect to load reviews from sessionStorage when component mounts
  useEffect(() => {
    const storedReviews = sessionStorage.getItem('reviews');
    if (storedReviews) {
      setReviews(JSON.parse(storedReviews));
    }
  }, []);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (feedback && name) {
      // Get current date in a readable format
      const currentDate = new Date().toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      });

      // Add new feedback to the reviews list
      const newReviews = [...reviews, { text: feedback, author: name, date: currentDate }];
      setReviews(newReviews);

      // Save updated reviews to sessionStorage
      sessionStorage.setItem('reviews', JSON.stringify(newReviews));

      // Clear form input
      setFeedback("");
      setName("");
    }
  };

  // Handle "View More" button click
  const handleViewMore = () => {
    setVisibleReviews(prev => prev + 2); // Increment visible reviews by 2
  };

  return (
    <div className="testimonials-container">
      {/* Store Description Section */}
      <div className="store-description">
        <h2>Gwalior's No. 1 Medical Store</h2>
        <p className="description">
          At <b>Gurudev Medical & Surgical</b>, established in 1975, we take pride in our 50 years of trust and commitment to delivering top-notch healthcare solutions. Our legacy of excellence is built on a deep-rooted presence in the community, offering a comprehensive range of high-quality pharmaceuticals, over-the-counter medications, and health products. Our knowledgeable and friendly staff are dedicated to providing expert advice and personalized care to ensure you and your family receive the best possible service. Trust us to be your reliable partner in health and wellness, where your well-being is our top priority.
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
              <p>As the proud owner of Gurudev Medical & Surgical, I am deeply invested in ensuring that our store not only meets but exceeds your expectations. Our mission is rooted in providing you with exceptional healthcare products and personalized service that goes beyond the ordinary. We understand the importance of reliable medications and compassionate support in your health journey. My family and I are dedicated to maintaining the highest standards of quality and service, driven by our commitment to your well-being. We are grateful for your trust and loyalty, and we strive every day to be the trusted partner in your health and wellness.</p>
              <span className="owner-name">~ Lokesh Sharma</span>
            </div>
          </div>
        </div>
      </div>

      {/* Customer Reviews Section */}
      <div className="reviews-section">
        <h2>What our customers have to say:</h2>
        <div className="reviews-grid">
          {reviews.slice(0, visibleReviews).map((review, index) => (
            <div key={index} className="review-box">
              <p className="review-text">“{review.text}”</p>
              <p className="review-author">{review.author}, {review.date}</p>
            </div>
          ))}
        </div>

        {/* "View More" button: only show if there are more reviews to display */}
        {visibleReviews < reviews.length && (
          <button onClick={handleViewMore} className="view-more-btn">
            View More
          </button>
        )}
      </div>

      {/* Feedback Form Section */}
      <div className="feedback-form-section">
        <h2>Wanna say something about us?</h2>
        <form onSubmit={handleSubmit} className="feedback-form">
          <input
            type="text"
            className="feedback-name"
            placeholder="Your name"
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
          <button type="submit" className="feedback-submit">Post</button>
        </form>
      </div>
    </div>
  );
};

export default Testimonials;
