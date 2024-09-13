import React from 'react';
import './MapComponent.css';

const MapEmbed = () => {
  return (
    <div className='maps'>
      <iframe 
        
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3580.0609600454377!2d78.15904663419803!3d26.194695175962906!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3976c433ebf52cd9%3A0x642d66451f8f7d5a!2sGurudev%20Medical!5e0!3m2!1sen!2sin!4v1726247317852!5m2!1sen!2sin"
       
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Gurudev Medical Location"
      ></iframe>
    </div>
  );
};

export default MapEmbed;
