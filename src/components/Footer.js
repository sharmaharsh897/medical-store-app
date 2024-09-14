import React from 'react';
import './Footer.css';
// Import the payment icons from the assets folder
import gpayIcon from '../components/assets/payment-icons/gpay.png';
import paytmIcon from '../components/assets/payment-icons/paytm.png';
import phonepeIcon from '../components/assets/payment-icons/phonepe.png';
import amazonpayIcon from '../components/assets/payment-icons/amazon-pay.png';
import airtelIcon from '../components/assets/payment-icons/airtel-money.png';
import visaIcon from '../components/assets/payment-icons/visa.png';
import mastercardIcon from '../components/assets/payment-icons/mastercard.png';
import rupayIcon from '../components/assets/payment-icons/rupay.png';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <h3>Our Payment Partners</h3>
        <div className="payment-icons">
          <img src={gpayIcon} alt="Google Pay" />
          <img src={paytmIcon} alt="Paytm" />
          <img src={phonepeIcon} alt="PhonePe" />
          <img src={amazonpayIcon} alt="Amazon Pay" />
          <img src={airtelIcon} alt="Airtel Bank" />
          <img src={visaIcon} alt="Visa" />
          <img src={mastercardIcon} alt="Mastercard" />
          <img src={rupayIcon} alt="Rupay" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
