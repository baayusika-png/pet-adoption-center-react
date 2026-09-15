import { useState } from "react";
import { FaPaw, FaTimes, FaHeadset, FaPaperPlane } from "react-icons/fa";

function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");

  // Handle sending a message
  const handleSend = () => {
    // Do not send an empty message
    if (message.trim() === "") return;

    // Clear the message input after sending
    setMessage("");
  };

  return (
    <div className="chat-container">
      {isOpen && (
        <div className="chat-box">
          <div className="chat-header">
            <div>
              <h3>Pet Adoption Support</h3>
              <p>We're here to help!</p>
            </div>

            <button className="chat-close" onClick={() => setIsOpen(false)}>
              <FaTimes />
            </button>
          </div>

          <div className="chat-messages">
            <div className="message-row">
              <div className="bot-icon">
                <FaHeadset />
              </div>

              <div className="bot-message">
                Hi there! 👋 How can I help you with your adoption journey
                today?
              </div>
            </div>

            <div className="user-message">
              I'm interested in adopting a Golden Retriever. Do you have any
              available?
            </div>

            <div className="message-row">
              <div className="bot-icon">
                <FaHeadset />
              </div>

              <div className="bot-message">
                Yes! We currently have Buddy, a friendly Golden Retriever. You
                can see him in our featured pets section.
              </div>
            </div>
          </div>

          <div className="chat-input">
            <input
              type="text"
              placeholder="Type your message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSend();
                }
              }}
            />

            <button onClick={handleSend}>
              <FaPaperPlane />
            </button>
          </div>
        </div>
      )}

      {!isOpen && (
        <button className="paw-button" onClick={() => setIsOpen(true)}>
          <FaPaw />
        </button>
      )}
    </div>
  );
}

export default ChatBot;
