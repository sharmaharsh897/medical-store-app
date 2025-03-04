/*eslint-disable*/
import React, { useState, useEffect, useCallback, useContext, useMemo } from "react";
import "./SearchSection.css";
import { UserContext } from "../context/userContext";
import medicines from "../data-access/medicines.json";
import { MdCancel } from "react-icons/md";
import ProductDetail from "./ProductDetail";

function SearchSection() {
  const [dynamicText, setDynamicText] = useState("Medicine"); 
  const [isFocused, setIsFocused] = useState(false);
  const [query, setQuery] = useState(""); // User input
  const [suggestions, setSuggestions] = useState([]); // Suggestions list
  const [error, setError] = useState(""); // Error state
  const [uploadMessage, setUploadMessage] = useState(""); // Tooltip message
  const [uploadSuccess, setUploadSuccess] = useState(null); // Track upload success/failure
  const [uploadedFile, setUploadedFile] = useState(null); // Uploaded file state
  const [selectedProduct, setSelectedProduct] = useState(null); // ✅ Store selected medicine
  const { user } = useContext(UserContext);
  const [isSuggestionSelected, setIsSuggestionSelected] = useState(false);
  const [searchErrorMessage, setSearchErrorMessage] = useState("");

  // ✅ Ensure unique medicine names
  const uniqueMedicines = useMemo(() => {
    const seen = new Set();
    return medicines.filter((medicine) => {
      if (!seen.has(medicine.name.toLowerCase())) {
        seen.add(medicine.name.toLowerCase());
        return true;
      }
      return false;
    });
  }, [medicines]); // Runs only if `medicines` changes

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

  // ✅ Filtering Suggestions
  useEffect(() => {
    if (query.length > 0) {
      const matchedSuggestions = uniqueMedicines.filter((medicine) =>
        medicine.name.toLowerCase().includes(query.toLowerCase())
      );

      setSuggestions(matchedSuggestions);
    } else {
      setSuggestions([]);
    }
  }, [query, uniqueMedicines]);

  const handleSuggestionClick = useCallback((suggestion) => {
    setQuery(suggestion.name);
    setIsSuggestionSelected(true);
    setSelectedProduct(suggestion); 
    
    setTimeout(() => {
      setSuggestions([]);
    }, 0);
  }, []);

  const handleInputChange = (e) => {
    setQuery(e.target.value);
    setIsSuggestionSelected(false);
    setSelectedProduct(null); // ✅ Reset product details on typing
    if (e.target.value === "") {
      setSuggestions([]);
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

    setUploadedFile(file);
    setUploadMessage(`"${file.name}" uploaded successfully!`);
    setUploadSuccess(true);
  };

  // Tooltip fade-out effect
  useEffect(() => {
    if (uploadMessage) {
      const timeout = setTimeout(() => {
        setUploadMessage("");
        setUploadSuccess(null);
      }, 4000);
      return () => clearTimeout(timeout);
    }
  }, [uploadMessage]);

  // ✅ Show product detail on Search button click
  const handleSearchButtonClick = () => {
    if (query.trim() === "") {
      setSearchErrorMessage("Please enter something in the search bar.");
    } else {
      const matchedProduct = uniqueMedicines.find(
        (medicine) => medicine.name.toLowerCase() === query.toLowerCase()
      );
      if (matchedProduct) {
        setSelectedProduct(matchedProduct); // ✅ Show product details on search
        setSearchErrorMessage(""); // ✅ Clear error if found
      } else {
        setSearchErrorMessage("Medicine not found!");
      }
    }
    setTimeout(() => {
      setSearchErrorMessage("");
    }, 4000);
  };

  return (
    <div className="search-section">
      <div className="search-bar">
        <div className="search-bar-header">
          {user ? (
            <span>
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
            <button className="clear-button" onClick={() => setQuery("")} type="button">
              <MdCancel />
            </button>
          )}
          <button onClick={handleSearchButtonClick} className="search-button">
            Search
          </button>
        </div>
         {/* ✅ Tooltip for search errors */}
      {searchErrorMessage && (
        <div className="upload-tooltip error">
          {searchErrorMessage}
        </div>
      )}
        <div className="suggestions-list">
          {suggestions.length > 0 && query ? (
            <ul>
              {suggestions.map((suggestion, index) => (
                <li key={index} onClick={() => handleSuggestionClick(suggestion)}>
                  {suggestion.name}
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </div>

      {/* ✅ Show Product Detail Below Search Bar */}
      {selectedProduct && <ProductDetail product={selectedProduct} />}

      {uploadMessage && (
        <div className={`upload-tooltip ${uploadSuccess ? "success" : "error"}`}>
          {uploadMessage}
        </div>
      )}
    </div>
  );
}

export default SearchSection;
