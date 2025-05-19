"use client"

import { useState } from "react"
import ChatHeader from "./ChatHeader"
import MessageList from "./MessageList"
import ChatInput from "./ChatInput"
import { useTheme } from "./theme-provider"
import "./Chat.css"

export function Chat() {
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
  const { theme, setTheme } = useTheme()
  const isDarkMode = theme === "dark"

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

    // ===== INTEGRATE YOUR BACKEND API HERE =====
    fetch('http://localhost:5000/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message }),
    })
      .then(async (res) => {
        if (!res.ok) {
          throw new Error('Failed to fetch response from server')
        }
        const data = await res.json()

        // Hide typing indicator
        setIsTyping(false)

        // Update previous message status to delivered
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === newUserMessage.id ? { ...msg, status: 'delivered' } : msg
          )
        )

        // Add bot response from API
        const botResponse = {
          id: (Date.now() + 1).toString(),
          content: data.reply || 'No response received.',
          sender: 'bot',
          timestamp: new Date(),
          status: 'read',
        }

        setMessages((prev) => [...prev, botResponse])

        // Optional: mark user message as read
        setTimeout(() => {
          setMessages((prev) =>
            prev.map((msg) =>
              msg.id === newUserMessage.id ? { ...msg, status: 'read' } : msg
            )
          )
        }, 1000)
      })
      .catch((err) => {
        setIsTyping(false)
        console.error('API Error:', err)
        const errorMessage = {
          id: (Date.now() + 2).toString(),
          content: 'Something went wrong while fetching reply.',
          sender: 'bot',
          timestamp: new Date(),
          status: 'read',
        }
        setMessages((prev) => [...prev, errorMessage])
      })
  }

  const toggleTheme = () => {
    setTheme(isDarkMode ? "light" : "dark")
  }

  return (
    <div className={`chat-container ${isDarkMode ? "dark-theme" : ""}`}>
      <ChatHeader toggleTheme={toggleTheme} darkMode={isDarkMode} />
      <MessageList messages={messages} isTyping={isTyping} />
      <ChatInput onSendMessage={handleSendMessage} />
    </div>
  )
}

export default Chat
