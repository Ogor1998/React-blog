import { useEffect, useState } from 'react'
import './App.css'
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import Login from './pages/users/Login'
import Register from './pages/users/Register'
import Home from './pages/Home'
import NavBar from './components/NavBar'
import axios from 'axios'
import New from './components/New'
import Show from './components/Show'
import Edit from './components/Edit'
import Error from './Utils/Error'
import Profile from './components/Profile'
import CssBaseline from '@mui/material/CssBaseline';



function App() {

  const [message, setMessage] = useState("")
  const [isLoggedIn, setIsloggedIn] = useState(false)
  const [currentUser, setCurrentUser] = useState(null)
  const navigate = useNavigate();

  const handleLogout = async () => {
    const response = await axios.post('/logout', {}, { withCredentials: true })
    setMessage(response.data.message)
    setIsloggedIn(false)
    setCurrentUser(null)
    navigate('/posts')
    console.log("Clicked")
  }

  useEffect(() => {
    const checkAuth = async () => {
      console.log("About to call check-auth")
      const response = await axios.get('/check-auth', { withCredentials: true })
      setIsloggedIn(response.data.isLoggedIn)
      console.log('Response form check-auth:', response.data)
      setCurrentUser(response.data.user)
    }
    checkAuth();
  }, [])

  return (
    <div>
      <CssBaseline />
      <NavBar isLoggedIn={isLoggedIn} currentUser={currentUser} handleLogout={handleLogout} />

      <Routes>
        <Route path="/" element={<Home message={message} setMessage={setMessage} />} />
        <Route path="/posts" element={<Home message={message} isLoggedIn={isLoggedIn} currentUser={currentUser} setMessage={setMessage} />} />
        <Route path="/login" element={<Login setMessage={setMessage} setIsLoggedIn={setIsloggedIn} setCurrentUser={setCurrentUser} />} />
        <Route path="/register" element={<Register
          setIsLoggedIn={setIsloggedIn}
          setCurrentUser={setCurrentUser}
          setMessage={setMessage}
        />} />
        <Route path="/posts/new" element={
          isLoggedIn ?
            <New message={message} setMessage={setMessage} />
            : <Navigate to="/login"
              state={{ message: "You must be logged in to create a post." }}
              replace />}
        />
        <Route path="/posts/:id" element={<Show isLoggedIn={isLoggedIn} currentUser={currentUser} />} />
        <Route path="/posts/:id/edit" element={<Edit setMessage={setMessage} message={message} />} />
        <Route path="*" element={<Error />} />
        <Route path="/error" element={<Error />} />
        <Route path="/profile/:id" element={<Profile />} />
      </Routes>

    </div>
  )
}

export default App
