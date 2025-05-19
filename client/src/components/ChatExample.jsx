"use client"

// This is an example of how to structure your chat component with the new styles
// You can adapt this to your existing component structure
import { useState, useRef, useEffect } from "react"
import "../styles/chat.css"

// Import your icons from your preferred icon library
// For example, if using React Icons:
// import { FiSend, FiPaperclip, FiSmile, FiMic } from 'react-icons/fi';

const ChatExample = () => {
  const [messages, setMessages] = useState([
    {
      id: "1",
      content: "Hello! How can I help you today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const messagesEndRef = useRef(null)

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSendMessage = () => {
    if (inputValue.trim() === "") return

    // Add user message
    const newUserMessage = {
      id: Date.now().toString(),
      content: inputValue,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, newUserMessage])
    setInputValue("")

    // Replace this with your actual API call
    setTimeout(() => {
      const botResponse = {
        id: (Date.now() + 1).toString(),
        content: "This is a simulated response. Connect this to your backend API.",
        sender: "bot",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, botResponse])
    }, 1000)
  }

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  return (
    <div className="chat-container">
      {/* Chat header */}
      <div className="chat-header">
        <div className="chat-avatar">AI</div>
        <div className="chat-user-info">
          <h2>Assistant</h2>
          <p>Online</p>
        </div>
      </div>

      {/* Messages area */}
      <div className="messages-container">
        {messages.map((message) => (
          <div key={message.id} className={`message ${message.sender}`}>
            <div className="message-bubble">
              <div>{message.content}</div>
              <div className="message-time">{formatTime(message.timestamp)}</div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input area */}
      <div className="chat-input-container">
        <div className="chat-input-wrapper">
          <button className="chat-button">{/* Replace with your paperclip icon */}📎</button>
          <input
            type="text"
            className="chat-input"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSendMessage()
              }
            }}
            placeholder="Type a message..."
          />
          <button className="chat-button">{/* Replace with your smile icon */}😊</button>
          <button className="chat-button">{/* Replace with your mic icon */}🎤</button>
          <button onClick={handleSendMessage} className="chat-button send-button">
            {/* Replace with your send icon */}➤
          </button>
        </div>
      </div>
    </div>
  )
}

export default ChatExample
