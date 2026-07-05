import { Link, useNavigate, useParams } from "react-router-dom"
import { Avatar, Button } from "@mui/material"
import './NavBar.css'
import NavBarU from "./NavBarU.jsx"
import { useAuth } from "../context/AuthContext.jsx"

const NavBar = ({ handleLogout }) => {
    const { isLoggedIn, currentUser } = useAuth();
    console.log("NAVBAR:", isLoggedIn, currentUser);
    return (
        <NavBarU isLoggedIn={isLoggedIn} currentUser={currentUser} handleLogout={handleLogout} />
    )

}
export default NavBar