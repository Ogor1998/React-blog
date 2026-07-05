import React from 'react'
import { createContext, useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const AuthContext = createContext();
useNavigate

export function AuthProvider({ children }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [currentUser, setCurrentUser] = useState(null)
    const [message, setMessage] = useState("")

    const logout = async () => {
        const response = await axios.post('/logout', {}, { withCredentials: true })
        setMessage(response.data.message)
        setIsLoggedIn(false)
        setCurrentUser(null)

    }

    return (
        <AuthContext.Provider value={{
            isLoggedIn,
            setIsLoggedIn,
            currentUser,
            message,
            setMessage,
            setCurrentUser,
            logout
        }}>
            {children}
        </AuthContext.Provider>
    )

}


export function useAuth() {
    return useContext(AuthContext);
}

