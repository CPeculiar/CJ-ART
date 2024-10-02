import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { AuthProvider } from './services/AuthContext.jsx'
import { BrowserRouter as Router } from 'react-router-dom'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
  <Router>
  <AuthProvider>
    <App />
</AuthProvider>
    </Router>
  </StrictMode>,
)
