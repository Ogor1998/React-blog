import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router'
import axios from 'axios'
import { AuthProvider } from './components/context/AuthContext.jsx'
axios.defaults.withCredentials = true  // ← add this
axios.defaults.baseURL = 'http://localhost:3000'
console.log("Requesting:", axios.defaults.baseURL + '/check-auth')

createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <BrowserRouter>
      <StrictMode>
        <App />
      </StrictMode>
    </BrowserRouter>
  </AuthProvider>

)
