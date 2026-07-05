import React from 'react'
import { createContext, useContext, useState } from 'react'
const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [currentUser, setCurrentUser] = useState(null)

    return (
        <AuthContext.Provider value={{
            isLoggedIn,
            setIsLoggedIn,
            currentUser,
            setCurrentUser
        }}>
            {children}
        </AuthContext.Provider>
    )

}


export function useAuth() {
    return useContext(AuthContext);
}

