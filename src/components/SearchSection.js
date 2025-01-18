/*eslint-disable*/
import React, { useState, useEffect, useCallback, useContext } from 'react';
import './SearchSection.css';
import { UserContext } from "../context/userContext";

function SearchSection() {
  const [dynamicText, setDynamicText] = useState('Medicine'); // For dynamic placeholder
  const [isFocused, setIsFocused] = useState(false); // Detect input focus
  const [query, setQuery] = useState(''); // User input
  const [suggestions, setSuggestions] = useState([]); // Suggestions list
  const [error, setError] = useState(''); // Error state
  const [uploadMessage, setUploadMessage] = useState(''); // Tooltip message
  const [uploadSuccess, setUploadSuccess] = useState(null); // Track upload success/failure
  const [uploadedFile, setUploadedFile] = useState(null); // Uploaded file state
  const { user } = useContext(UserContext);
  

  // Dynamic placeholder effect
  useEffect(() => {
    const placeholders = ['Medicine', 'Health Drinks', 'Surgicals'];
    let index = 0;

    const changePlaceholder = () => {
      if (!isFocused) {
        setDynamicText(placeholders[index]);
        index = (index + 1) % placeholders.length;
      }
    };

    const intervalId = setInterval(changePlaceholder, 1200);
    return () => clearInterval(intervalId);
  }, [isFocused]);

  // Fetch suggestions
  useEffect(() => {
    if (query.length > 0) {
      fetch(`https://clinicaltables.nlm.nih.gov/api/rxterms/v3/search?terms=${query}&df=DISPLAY_NAME&ef=STRENGTHS_AND_FORMS,RXCUIS`)
        .then(response => response.json())
        .then(data => {
          console.log('API Response:', data); // Log the API response to check the structure
  
          if (data && data[1]) {
            // Extract display names from the API response
            const filteredTerms = data[1]; // No need to map, directly use the drug names
            console.log('Filtered Terms:', filteredTerms); // Log filtered terms before setting them
  
            // Filter suggestions based on the query
            const matchedSuggestions = filteredTerms.filter(term =>
              term.toLowerCase().includes(query.toLowerCase())
            );
  
            setSuggestions(matchedSuggestions);
          } else {
            setSuggestions([]);
          }
        })
        .catch(() => {
          setError('Failed to fetch suggestions');
        });
    } else {
      setSuggestions([]);
    }
  }, [query]);
  

  // Handle suggestion click
  const handleSuggestionClick = useCallback((suggestion) => {
    setQuery(suggestion);
    setSuggestions([]);
  }, []);

  // Handle file upload
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png'];
    if (!allowedTypes.includes(file.type)) {
      setUploadMessage('Invalid file type. Please upload a PDF or image.');
      setUploadSuccess(false);
      return;
    }

    if (file.size > 5 * 1024 * 1024) { // 5MB size limit
      setUploadMessage('File size exceeds the 5MB limit.');
      setUploadSuccess(false);
      return;
    }

    setUploadedFile(file); // Save uploaded file
    setUploadMessage(`"${file.name}" uploaded successfully!`);
    setUploadSuccess(true);
  };

  // Handle file removal

  // Tooltip fade-out effect
  useEffect(() => {
    if (uploadMessage) {
      const timeout = setTimeout(() => {
        setUploadMessage('');
        setUploadSuccess(null);
      }, 4000); // Clear message after 4 seconds
      return () => clearTimeout(timeout);
    }
  }, [uploadMessage]);

  return (
    <div className="search-section">
      <div className="search-bar">
        <div className="search-bar-header">

        {user ? (
              <span className=""><h2>Hi {user.first_name}, What are you looking for?</h2></span> // Display user name
            ) : (<h2>What are you looking for?</h2>)
            
            }

          
          <div className="upload-prescription">
            <span>Order with prescription.</span>
            <label htmlFor="file-upload" className="upload-label">
              UPLOAD NOW &gt;
            </label>
            <input
              id="file-upload"
              type="file"
              accept=".pdf, .jpg, .jpeg, .png"
              style={{ display: 'none' }}
              onChange={handleFileUpload}
            />
          </div>
        </div>
        <div className="search-input-container">
          <input
            type="text"
            className="search-input"
            placeholder={`Search for ${dynamicText}`}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button className="search-button">Search</button>
        </div>
        <div className="suggestions-list">
          {suggestions.length > 0 ? (
            <ul>
              {suggestions.map((suggestion, index) => (
                <li key={index} onClick={() => handleSuggestionClick(suggestion)}>
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
      {uploadMessage && (
        <div
          className={`upload-tooltip ${uploadSuccess ? 'success' : 'error'}`}
        >
          {uploadMessage}
        </div>
      )}
    </div>
  );
}

export default SearchSection;
