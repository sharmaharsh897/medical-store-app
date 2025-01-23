/*eslint-disable*/
import React, { useState, useEffect, useCallback, useContext } from "react";
import "./SearchSection.css";
import { UserContext } from "../context/userContext";
import medicines from "../data-access/medicines.json";
import { MdCancel } from "react-icons/md";

function SearchSection() {
  const [dynamicText, setDynamicText] = useState("Medicine"); // For dynamic placeholder
  const [isFocused, setIsFocused] = useState(false); // Detect input focus
  const [query, setQuery] = useState(""); // User input
  const [suggestions, setSuggestions] = useState([]); // Suggestions list
  const [error, setError] = useState(""); // Error state
  const [uploadMessage, setUploadMessage] = useState(""); // Tooltip message
  const [uploadSuccess, setUploadSuccess] = useState(null); // Track upload success/failure
  const [uploadedFile, setUploadedFile] = useState(null); // Uploaded file state
  const { user } = useContext(UserContext);
  const [isSuggestionSelected, setIsSuggestionSelected] = useState(false);

  // Dynamic placeholder effect
  useEffect(() => {
    const placeholders = ["Medicine", "Health Drinks", "Surgicals"];
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
  // useEffect(() => {
  //   if (query.length > 0) {
  //     fetch(`https://rxnav.nlm.nih.gov/REST/rxcui/rxcui=${query}`)
  //       .then((response) => response.json())
  //       .then((data) => {
  //         console.log("API Response:", data); // Log the API response to check the structure

  //         if (data && data.displayTermsList && data.displayTermsList.term) {
  //           // Extract display terms from the API response
  //           const filteredTerms = data.displayTermsList.term; // Directly use the drug names
  //           console.log("Filtered Terms:", filteredTerms); // Log filtered terms before setting them

  //           // Filter suggestions based on the query
  //           const matchedSuggestions = filteredTerms.filter((term) =>
  //             term.toLowerCase().includes(query.toLowerCase())
  //           );

  //           setSuggestions(matchedSuggestions);
  //         } else {
  //           setSuggestions([]);
  //         }
  //       })
  //       .catch(() => {
  //         setError("Failed to fetch suggestions");
  //       });
  //   } else {
  //     setSuggestions([]);
  //   }
  // }, [query]);

  useEffect(() => {
    // Create a deduplicated list of medicines
    const uniqueMedicines = [...new Set(medicines)];

    if (query.length > 0) {
      const matchedSuggestions = uniqueMedicines.filter((medicine) =>
        medicine.toLowerCase().includes(query.toLowerCase())
      );

      // Prevent showing the suggestion list if the query is an exact match
      if (matchedSuggestions.length === 1 && matchedSuggestions[0] === query) {
        setSuggestions([]);
      } else {
        setSuggestions(matchedSuggestions);
      }
    } else {
      setSuggestions([]);
    }
  }, [query]);

  // Handle suggestion click
  const handleSuggestionClick = useCallback((suggestion) => {
    setQuery(suggestion); // Set query to the selected suggestion
    setSuggestions([]); // Clear the suggestions list
    setIsSuggestionSelected(true); // Mark as suggestion selected
  }, []);

  const handleInputChange = (e) => {
    setQuery(e.target.value); // Update the query
    setIsSuggestionSelected(false); // Reset the flag since user is typing
    if (e.target.value === "") {
      setSuggestions([]); // Clear suggestions when input is empty
    }
  };

  // Handle file upload
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const allowedTypes = ["application/pdf", "image/jpeg", "image/png"];
    if (!allowedTypes.includes(file.type)) {
      setUploadMessage("Invalid file type. Please upload a PDF or image.");
      setUploadSuccess(false);
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      // 5MB size limit
      setUploadMessage("File size exceeds the 5MB limit.");
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
        setUploadMessage("");
        setUploadSuccess(null);
      }, 4000); // Clear message after 4 seconds
      return () => clearTimeout(timeout);
    }
  }, [uploadMessage]);

  const handleSearchButtonClick = () => {
    if (query.trim() === "") {
      // If the input field is empty, prompt the user to enter something
      alert("Please enter something in the search bar.");
    } else {
      // Add the "active" effect to the button
      const searchButton = document.querySelector(".search-button");
      searchButton.classList.add("active");

      // Remove the active class after the animation
      setTimeout(() => {
        searchButton.classList.remove("active");
      }, 200); // Time should match the transition duration

      // Proceed with search logic if input is not empty
      console.log("Search button clicked with query:", query);
      // Add search logic here if needed
    }
  };

  return (
    <div className="search-section">
      <div className="search-bar">
        <div className="search-bar-header">
          {user ? (
            <span className="">
              <h2>Hi {user.first_name}, What are you looking for?</h2>
            </span>
          ) : (
            <h2>What are you looking for?</h2>
          )}

          <div className="upload-prescription">
            <span>Order with prescription.</span>
            <label htmlFor="file-upload" className="upload-label">
              UPLOAD NOW &gt;
            </label>
            <input
              id="file-upload"
              type="file"
              accept=".pdf, .jpg, .jpeg, .png"
              style={{ display: "none" }}
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
            onChange={handleInputChange}
          />
          {query && (
            <button
              className="clear-button"
              onClick={() => setQuery("")} // Clears the input
              type="button"
            >
              <MdCancel />
            </button>
          )}
          <button onClick={handleSearchButtonClick} className="search-button">
            Search
          </button>
        </div>
        <div className="suggestions-list">
          {suggestions.length > 0 && query ? (
            <ul>
              {suggestions.map((suggestion, index) => (
                <li
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  {suggestion}
                </li>
              ))}
            </ul>
            
          ) : (
            query &&
            !isSuggestionSelected &&
            suggestions.length === 0 && <p>No suggestions found</p>
          )}
        </div>
        {error && <div className="error-message">{error}</div>}
      </div>
      {uploadMessage && (
        <div
          className={`upload-tooltip ${uploadSuccess ? "success" : "error"}`}
        >
          {uploadMessage}
        </div>
      )}
    </div>
  );
}

export default SearchSection;
