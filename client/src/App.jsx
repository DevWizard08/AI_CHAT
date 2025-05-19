import { Chat } from "./components/Chat"
import { ThemeProvider } from "./components/theme-provider"
import "./App.css"

function App() {
  return (
    <ThemeProvider>
      <div className="app-container">
        <header className="app-header">
          <h1>Chat Application</h1>
        </header>
        <main className="app-content">
          <Chat />
        </main>
        <footer className="app-footer">
          <p>© {new Date().getFullYear()} Your Company</p>
        </footer>
      </div>
    </ThemeProvider>
  )
}

export default App
