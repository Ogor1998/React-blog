import { Link, useNavigate, useParams } from "react-router-dom"
import { Avatar, Button } from "@mui/material"
import './NavBar.css'
import NavBarU from "./NavBarU.jsx"

const NavBar = ({ isLoggedIn, currentUser, handleLogout }) => {
    const navigate = useNavigate()

    const profilePage = () => {
        return navigate(`/profile/${currentUser?._id}`)
    }
    return (
        <NavBarU isLoggedIn={isLoggedIn} currentUser={currentUser} handleLogout={handleLogout} />
    )
}

export default NavBar