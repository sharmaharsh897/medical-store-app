/*eslint-disable*/
import React, { useEffect, useState } from "react";
import "./Chatbot.css";
import logoIcon from "../components/assets/gurulogo.png";
import notificationSound from "../components/assets/bell.mp3"; 

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showNotification, setShowNotification] = useState(true);
  const [hasPlayed, setHasPlayed] = useState(false); 
  const [chat, setChat] = useState([
    { text: "Hi there! How can I assist you today? Ask me about medicines", isUser: false },
  ]);
  const [userInput, setUserInput] = useState(""); 

  useEffect(() => {
    const playSound = () => {
      const audio = new Audio(notificationSound);
      audio
        .play()
        .then(() => setHasPlayed(true)) 
        .catch(() => console.log("Autoplay failed. Waiting for user interaction."));
    };

    if (!hasPlayed) {
      playSound();
    }

    const enableSoundOnInteraction = () => {
      if (!hasPlayed) {
        playSound();
      }
    };

    document.addEventListener("click", enableSoundOnInteraction);
    document.addEventListener("keydown", enableSoundOnInteraction);

    return () => {
      document.removeEventListener("click", enableSoundOnInteraction);
      document.removeEventListener("keydown", enableSoundOnInteraction);
    };
  }, [hasPlayed]);

  const predefinedResponses = {
    "order medicine": "You can order medicines online through our website!",
    "consult doctor": "We provide free consultations with medical experts.",
    "know more": "We offer a wide range of healthcare services.",
    "hello": "Hello! How can I assist you today?",
    "hi": "Hi there! Feel free to ask any question.",
    "goodbye": "Goodbye! Have a great day!",
  };

  const handleUserInput = (e) => {
    e.preventDefault();
    if (!userInput.trim()) return;

    const userMessage = { text: userInput, isUser: true };
    setChat((prevChat) => [...prevChat, userMessage]);

    // Convert input to lowercase for better matching
    const lowerCaseInput = userInput.toLowerCase();
    const botResponse = predefinedResponses[lowerCaseInput] || "Sorry, I don't have an answer for that. Try asking something else.";

    setTimeout(() => {
      setChat((prevChat) => [...prevChat, { text: botResponse, isUser: false }]);
    }, 500);

    setUserInput(""); // Clear input field
  };

  const handleChatbotToggle = () => {
    setIsOpen(true);
    setShowNotification(false);
  };

  return (
    <div className="chatbot-container">
      {!isOpen && (
        <button className="chatbot-toggle" onClick={handleChatbotToggle}>
          <img src={logoIcon} alt="Logo" className="logo-image" />
          {showNotification && <div className="notification-badge">1</div>}
        </button>
      )}
      {isOpen && (
        <div className="chatbot-box">
          <div className="chatbot-header">
            <h4>Hi, Welcome to our Virtual Assistant</h4>
            <button onClick={() => setIsOpen(false)}>✖</button>
          </div>
          <div className="chatbot-body">
            {chat.map((message, index) => (
              <div key={index} className={`chatbot-message ${message.isUser ? "user-message" : "bot-message"}`}>
                <p>{message.text}</p>
              </div>
            ))}
          </div>
          <div className="chatbot-input">
            <form onSubmit={handleUserInput}>
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="Type your question..."
              />
              <button type="submit">Send</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
