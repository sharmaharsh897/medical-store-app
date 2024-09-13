import React from 'react';
import './Testimonials.css';
import ownerImage from '../components/assets/owner.jpg'; // Make sure to add the correct path to the owner's image

const Testimonials = () => {
  return (
    <div className="testimonials-container">
      {/* Owner's Words Section */}
      <div className="owner-section">
        <h2>Some words from owner</h2>
        <div className="owner-content">
          <img src={ownerImage} alt="Owner" className="owner-image" />
          <div className="owner-paragraph">
            <div className="quote-box">
              <span className="quote">“</span>
              <p>
                As the proud owner of Gurudev Medical Store & Surgical, I am deeply invested in ensuring that our store not only meets but exceeds your expectations. Our mission is rooted in providing you with exceptional healthcare products and personalized service that goes beyond the ordinary. We understand the importance of reliable medications and compassionate support in your health journey. My team and I are dedicated to maintaining the highest standards of quality and service, driven by our commitment to your well-being. We are grateful for your trust and loyalty, and we strive every day to be the trusted partner in your health and wellness.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Customer Reviews Section */}
      <div className="reviews-section">
        <h2>What our customers have to say:</h2>
        <div className="reviews-grid">
          <div className="review-box">
            <p className="review-text">
              “I’ve been a regular customer at Gwalior’s No. 1 Medical Store for years, and I’m always impressed by their professionalism and friendly service. They have a great selection of products, and their staff is always ready to help with any questions. Highly recommended!”
            </p>
            <p className="review-author">Priya Sharma, 10 August 2023</p>
          </div>
          <div className="review-box">
            <p className="review-text">
              “This is my go-to pharmacy for all my family’s needs. The quality of their medicines and the knowledgeable staff make a huge difference. I appreciate their dedication to customer care and the quick service they provide.”
            </p>
            <p className="review-author">Rajesh Patel, 22 July 2023</p>
          </div>
          <div className="review-box">
            <p className="review-text">
              “Gwalior’s No. 1 Medical Store has always exceeded my expectations. Their staff is not only courteous but also very attentive, ensuring I get the right products every time. It’s reassuring to have such a reliable place for all my health needs.”
            </p>
            <p className="review-author">Anita Verma, 15 September 2023</p>
          </div>
          <div className="review-box">
            <p className="review-text">
              “Fantastic service and a great range of products. The team at this store is incredibly helpful and makes sure I leave with everything I need. I wouldn’t trust my health needs to anyone else!”
            </p>
            <p className="review-author">Suresh Kumar, 5 June 2023</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
