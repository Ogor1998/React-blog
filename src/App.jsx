import { useEffect, useState } from 'react'
import './App.css'
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import Login from './pages/users/Login'
import Register from './pages/users/Register'
import Home from './pages/Home'
import NavBar from './components/common/NavBar'
import axios from 'axios'
import New from './pages/posts/New'
import Show from './pages/posts/Show'
import Edit from './pages/posts/Edit'
import Error from './pages/Error'
import Profile from './components/Profile'
import CssBaseline from '@mui/material/CssBaseline';
import { useAuth } from './components/context/AuthContext'

function App() {

  const [message, setMessage] = useState("")
  const [postMessage, setPostMessage] = useState("")
  const navigate = useNavigate();
  const location = useLocation();
  const { isLoggedIn, setIsLoggedIn, currentUser, setCurrentUser } = useAuth();

  const handleLogout = async () => {
    const response = await axios.post('/logout', {}, { withCredentials: true })
    setMessage(response.data.message)
    setIsLoggedIn(false)
    setCurrentUser(null)
    navigate('/posts')
  }

  useEffect(() => {
    const checkAuth = async () => {
      try {
        console.log("About to call check-auth")
        const response = await axios.get('/check-auth', { withCredentials: true })
        if (response.data.isLoggedIn) {
          setIsLoggedIn(true);
          setCurrentUser(response.data.user)
        }
      } catch (err) {
        console.log(err)
      }
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
        <Route path="/login" element={<Login setMessage={setMessage} setIsLoggedIn={setIsLoggedIn} setCurrentUser={setCurrentUser} message={message} />} />
        <Route path="/register" element={<Register
          setIsLoggedIn={setIsLoggedIn}
          setCurrentUser={setCurrentUser}
          setMessage={setMessage}
        />} />
        <Route path="/posts/new" element={
          isLoggedIn ?
            <New message={postMessage} setMessage={setPostMessage} />
            : <Navigate to="/login"
              state={{
                from: location
                , message: "You must be logged in to create a post."
              }}
              replace />}
        />
        <Route path="/posts/:id" element={<Show isLoggedIn={isLoggedIn} currentUser={currentUser} />} />
        <Route path="/posts/:id/edit" element={<Edit setMessage={setMessage} message={message} />} />
        <Route path="*" element={<Error />} />
        <Route path="/error" element={<Error />} />
        <Route path="/profile/:username" element={<Profile isLoggedIn={isLoggedIn} />} />
      </Routes>

    </div>
  )
}

export default App
