import React, { useState, useEffect } from 'react';
import './SearchSection.css';

function SearchSection() {
  const [dynamicText, setDynamicText] = useState('Medicine'); // For dynamic part of placeholder
  const [isFocused, setIsFocused] = useState(false); // To detect focus on input

  useEffect(() => {
    const placeholders = ['Medicine', 'Health Drinks', 'Surgicals'];

    let index = 0;
    const changePlaceholder = () => {
      if (!isFocused) { // Change the placeholder only when input is not focused
        setDynamicText(placeholders[index]);
        index = (index + 1) % placeholders.length;
      }
    };

    const intervalId = setInterval(changePlaceholder, 1200);

    return () => clearInterval(intervalId); // Clean up interval on unmount
  }, [isFocused]); // Stop changing placeholder when input is focused

  return (
    <div className="search-section">
      <div className="search-bar">
        <h2>What are you looking for?</h2>
        <div className="search-input-container">
          <input
            type="text"
            className="search-input"
            placeholder={`Search for ${dynamicText}`}
            onFocus={() => setIsFocused(true)} // Stop changing placeholder when focused
            onBlur={() => setIsFocused(false)} // Resume changing placeholder when not focused
          />
          <button className="search-button">Search</button>
        </div>
        <div className="upload-prescription">
          <span>Order with prescription.</span>
          <a href="/">UPLOAD NOW &gt;</a>
        </div>
      </div>      
    </div>
  );
}

export default SearchSection;
