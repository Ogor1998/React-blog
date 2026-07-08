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
import Footer from './components/common/Footer'
function App() {
  const [postMessage, setPostMessage] = useState("")
  const navigate = useNavigate();
  const location = useLocation();
  const { isLoggedIn, setIsLoggedIn, currentUser, setCurrentUser } = useAuth();


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
    <div className='App'>
      <CssBaseline />
      <NavBar isLoggedIn={isLoggedIn} currentUser={currentUser} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/posts" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
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
        <Route path="/posts/:id" element={<Show />} />
        <Route path="/posts/:id/edit" element={<Edit />} />
        <Route path="*" element={<Error />} />
        <Route path="/error" element={<Error />} />
        <Route path="/profile/:username" element={<Profile />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
