"use client"

import { useState, useEffect } from "react"
import "./ChatInterface.css"
import MessageList from "./MessageList"
import ChatInput from "./ChatInput"
import ChatHeader from "./ChatHeader"

const ChatInterface = () => {
  const [messages, setMessages] = useState([
    {
      id: "1",
      content: "Hello! How can I help you today?",
      sender: "bot",
      timestamp: new Date(),
      status: "read",
    },
  ])

  const [isTyping, setIsTyping] = useState(false)
  const [darkMode, setDarkMode] = useState(false)

  // Apply dark mode to body
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-theme")
    } else {
      document.body.classList.remove("dark-theme")
    }
  }, [darkMode])

  const handleSendMessage = (message) => {
    if (!message.trim()) return

    // Add user message
    const newUserMessage = {
      id: Date.now().toString(),
      content: message,
      sender: "user",
      timestamp: new Date(),
      status: "sent",
    }

    setMessages((prev) => [...prev, newUserMessage])

    // Show typing indicator
    setIsTyping(true)

    // Simulate API call delay
    setTimeout(() => {
      // Update previous message status
      setMessages((prev) => prev.map((msg) => (msg.id === newUserMessage.id ? { ...msg, status: "delivered" } : msg)))

      // Hide typing indicator
      setIsTyping(false)

      // Add bot response
      const botResponse = {
        id: (Date.now() + 1).toString(),
        content: "This is a simulated response. Replace this with your actual API integration.",
        sender: "bot",
        timestamp: new Date(),
        status: "read",
      }

      setMessages((prev) => [...prev, botResponse])

      // Update user message status to read
      setTimeout(() => {
        setMessages((prev) => prev.map((msg) => (msg.id === newUserMessage.id ? { ...msg, status: "read" } : msg)))
      }, 1000)
    }, 1500)
  }

  const toggleTheme = () => {
    setDarkMode((prev) => !prev)
  }

  return (
    <div className="chat-interface">
      <div className="chat-container">
        <ChatHeader toggleTheme={toggleTheme} darkMode={darkMode} />
        <MessageList messages={messages} isTyping={isTyping} />
        <ChatInput onSendMessage={handleSendMessage} />
      </div>
    </div>
  )
}

export default ChatInterface
