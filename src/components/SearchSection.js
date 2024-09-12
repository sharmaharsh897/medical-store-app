import React, { useState, useEffect, useCallback } from 'react';
import './SearchSection.css';

function SearchSection() {
  const [dynamicText, setDynamicText] = useState('Medicine'); // For dynamic part of placeholder
  const [isFocused, setIsFocused] = useState(false); // To detect focus on input
  const [query, setQuery] = useState(''); // User input
  const [suggestions, setSuggestions] = useState([]); // Suggestions list
  const [error, setError] = useState(''); // Error state

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

  useEffect(() => {
    // Fetch suggestions from API based on the query
    if (query.length > 0) {
      fetch(`https://rxnav.nlm.nih.gov/REST/displaynames.json`)
        .then(response => response.json())
        .then(data => {
          console.log('API Response:', data); // Log the entire response
          // Adjust data access based on actual structure
          if (data && data.displayTermsList && data.displayTermsList.term) {
            console.log('Display Terms List:', data.displayTermsList); // Log the displayTermsList
            const filteredTerms = data.displayTermsList.term.filter(term =>
              term.toLowerCase().includes(query.toLowerCase())
            );
            console.log('Filtered Terms:', filteredTerms); // Log the filtered terms
            setSuggestions(filteredTerms);
          } else {
            setSuggestions([]);
          }
        })
        .catch(error => {
          console.error('Error fetching data:', error);
          setError('Failed to fetch suggestions');
        });
    } else {
      setSuggestions([]);
    }
  }, [query]); // Fetch suggestions whenever query changes

  // Handle click on a suggestion
  const handleSuggestionClick = useCallback((suggestion) => {
    setQuery(suggestion);
    setSuggestions([]); // Clear suggestions list
  }, []);

  return (
    <div className="search-section">
      <div className="search-bar">
        <div className="search-bar-header">
          <h2>What are you looking for?</h2>
          <div className="upload-prescription">
            <span>Order with prescription.</span>
            <a href="/">UPLOAD NOW &gt;</a>
          </div>
        </div>
        <div className="search-input-container">
          <input
            type="text"
            className="search-input"
            placeholder={`Search for ${dynamicText}`}
            onFocus={() => setIsFocused(true)} // Stop changing placeholder when focused
            onBlur={() => setIsFocused(false)} // Resume changing placeholder when not focused
            value={query}
            onChange={(e) => setQuery(e.target.value)} // Update query state
          />
          <button className="search-button">Search</button>
        </div>
        <div className="suggestions-list">
          {suggestions.length > 0 ? (
            <ul>
              {suggestions.map((suggestion, index) => (
                <li
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion)} // Handle click
                >
                  {suggestion}
                </li>
              ))}
            </ul>
          ) : (
            query && <p>No suggestions found</p>
          )}
        </div>
        {error && <div className="error-message">{error}</div>}
      </div>      
    </div>
  );
}

export default SearchSection;
