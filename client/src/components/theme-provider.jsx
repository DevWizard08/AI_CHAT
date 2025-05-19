"use client"

import { createContext, useContext, useEffect, useState } from "react"

// Create a context for the theme
const ThemeContext = createContext({
  theme: "light",
  setTheme: () => null,
})

// Hook to use the theme context
export const useTheme = () => useContext(ThemeContext)

export function ThemeProvider({ children }) {
  // Check if we're in a browser environment
  const isBrowser = typeof window !== "undefined"

  // Initialize theme state from localStorage or system preference
  const [theme, setTheme] = useState(() => {
    if (isBrowser) {
      const storedTheme = localStorage.getItem("theme")
      if (storedTheme) {
        return storedTheme
      }
      return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
    }
    return "light"
  })

  // Update the theme
  const updateTheme = (newTheme) => {
    setTheme(newTheme)
    if (isBrowser) {
      localStorage.setItem("theme", newTheme)
    }
  }

  // Apply the theme to the document
  useEffect(() => {
    if (isBrowser) {
      const root = window.document.documentElement
      root.classList.remove("light", "dark")
      root.classList.add(theme)

      if (theme === "dark") {
        document.body.classList.add("dark-theme")
      } else {
        document.body.classList.remove("dark-theme")
      }
    }
  }, [theme, isBrowser])

  // Listen for system theme changes
  useEffect(() => {
    if (isBrowser) {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
      const handleChange = (e) => {
        if (!localStorage.getItem("theme")) {
          setTheme(e.matches ? "dark" : "light")
        }
      }

      mediaQuery.addEventListener("change", handleChange)
      return () => mediaQuery.removeEventListener("change", handleChange)
    }
  }, [isBrowser])

  return <ThemeContext.Provider value={{ theme, setTheme: updateTheme }}>{children}</ThemeContext.Provider>
}
