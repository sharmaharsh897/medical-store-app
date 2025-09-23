/*eslint-disable*/
import React, { useState, useEffect, useRef } from "react";
import "./Chatbot.css";
import logoIcon from "../components/assets/gurulogo.png";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showNotification, setShowNotification] = useState(true);
  const [chat, setChat] = useState([
    { text: "Hi there! How can I assist you today? Ask me about medicines", isUser: false },
  ]);
  const [userInput, setUserInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const chatBodyRef = useRef(null);

  const predefinedResponses = {
    "order medicine": "You can order medicines online through our website!",
    "consult doctor": "We provide free consultations with medical experts.",
    "know more": "We offer a wide range of healthcare services.",
    "hello": "Hello! How can I assist you today?",
    "hi": "Hi there! Feel free to ask any question.",
    "goodbye": "Goodbye! Have a great day!",
  };

  const handleUserInput = async (e) => {
    e.preventDefault();
    if (!userInput.trim()) return;

    const userMessage = { text: userInput, isUser: true };
    setChat((prevChat) => [...prevChat, userMessage]);
    setUserInput("");

    const lowerCaseInput = userInput.toLowerCase();
    const botResponse = predefinedResponses[lowerCaseInput];

    if (botResponse) {
      setIsTyping(true);
      setTimeout(() => {
        setChat((prevChat) => [...prevChat, { text: botResponse, isUser: false }]);
        setIsTyping(false);
      }, 800);
    } else {
      try {
        setIsTyping(true);
        const res = await fetch("http://localhost:5000/api/gemini/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ prompt: userInput }),
        });
        const data = await res.json();

        setTimeout(() => {
          setChat((prevChat) => [
            ...prevChat,
            { text: data.reply || "Sorry, I couldn't generate a response.", isUser: false },
          ]);
          setIsTyping(false);
        }, 800);
      } catch (err) {
        console.error("Error calling Gemini:", err);
        setChat((prevChat) => [
          ...prevChat,
          { text: "Oops! Something went wrong.", isUser: false },
        ]);
        setIsTyping(false);
      }
    }
  };

  // Scroll to bottom when new message arrives
  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [chat, isTyping]);

  return (
    <div className="chatbot-container">
      {!isOpen && (
        <button
          className="chatbot-toggle"
          onClick={() => {
            setIsOpen(true);
            setShowNotification(false);
          }}
        >
          <img src={logoIcon} alt="Logo" className="logo-image" />
          {showNotification && <div className="notification-badge">1</div>}
        </button>
      )}

      {isOpen && (
        <div className={`chatbot-box ${isOpen ? "open" : ""}`}>
          <div className="chatbot-header">
            <h4>Hi, Welcome to our Virtual Assistant</h4>
            <button onClick={() => setIsOpen(false)}>✖</button>
          </div>

          <div className="chatbot-body" ref={chatBodyRef}>
            {chat.map((message, index) => (
              <div
                key={index}
                className={`chatbot-message ${message.isUser ? "user-message" : "bot-message"}`}
              >
                <p>{message.text}</p>
              </div>
            ))}
            {isTyping && (
              <div className="chatbot-message bot-message typing">
                <p>Typing...</p>
              </div>
            )}
          </div>

          <div className="chatbot-input">
            <form onSubmit={handleUserInput} style={{ display: "flex", width: "100%" }}>
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
