import React, { useEffect, useState } from "react";
import "./Chatbot.css";
import logoIcon from "../components/assets/gurulogo.png";
import notificationSound from "../components/assets/bell.mp3"; // Path to your audio file

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showNotification, setShowNotification] = useState(true);
  const [hasPlayed, setHasPlayed] = useState(false); // Track if sound has played
  const [chat, setChat] = useState([
    {
      text: "Hi there! How can I help you?",
      options: ["Order Medicine", "Consult Doctor", "Know More"],
      isUser: false,
    },
  ]);

  useEffect(() => {
    const playSound = () => {
      const audio = new Audio(notificationSound);
      audio
        .play()
        .then(() => {
          setHasPlayed(true); // Mark sound as played
        })
        .catch(() => {
          console.log("Autoplay failed. Waiting for user interaction.");
        });
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

  const handleOptionClick = (option) => {
    const userMessage = { text: option, options: [], isUser: true };
    setChat((prevChat) => [...prevChat, userMessage]);

    let newMessage = { text: "", options: [], isUser: false };
    if (option === "Order Medicine") {
      newMessage = {
        text: "You can order medicines online here!",
        options: ["Go Back", "Exit"],
      };
    } else if (option === "Consult Doctor") {
      newMessage = {
        text: "We provide free consultations with experts.",
        options: ["Go Back", "Exit"],
      };
    } else if (option === "Know More") {
      newMessage = {
        text: "We offer a wide range of services.",
        options: ["Go Back", "Exit"],
      };
    } else if (option === "Go Back") {
      newMessage = {
        text: "Hi there! How can I help you?",
        options: ["Order Medicine", "Consult Doctor", "Know More"],
      };
    } else if (option === "Exit") {
      setIsOpen(false);
      return;
    }

    setTimeout(() => {
      setChat((prevChat) => [...prevChat, newMessage]);
    }, 500); // Add a slight delay for better UX
  };

  const handleChatbotToggle = () => {
    setIsOpen(true);
    setShowNotification(false); // Hide notification once chatbot is opened
  };

  return (
    <div className="chatbot-container">
      {!isOpen && (
        <button className="chatbot-toggle" onClick={handleChatbotToggle}>
          <img src={logoIcon} alt="Logo" className="logo-image" />
          {showNotification && <div className="notification-badge">!</div>}
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
              <div
                key={index}
                className={`chatbot-message ${
                  message.isUser ? "user-message" : "bot-message"
                }`}
              >
                <p>{message.text}</p>
                <div className="chatbot-options">
                  {!message.isUser &&
                    message.options.map((option, idx) => (
                      <button
                        key={idx}
                        className="chatbot-option-button"
                        onClick={() => handleOptionClick(option)}
                      >
                        {option}
                      </button>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
