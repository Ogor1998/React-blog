import { Link, useNavigate, useParams } from "react-router-dom"
import { Avatar, Button } from "@mui/material"
import './NavBar.css'

const NavBar = ({ isLoggedIn, currentUser, handleLogout }) => {
    const navigate = useNavigate()

    const profilePage = () => {
        return navigate(`/profile/${currentUser?._id}`)
    }
    return (
        <nav className="NavBar">
            {isLoggedIn ? (
                <>
                    <span>Welcome, {currentUser?.username}

                    </span>
                    <Avatar sx={{ display: 'flex', justifySelf: 'center' }} onClick={() => profilePage()}
                        src={currentUser.image}
                    // src={"https://img.magnific.com/premium-vector/red-kite-icon-clipart-avatar-logotype-isolated-illustration_955346-2090.jpg?semt=ais_hybrid&w=740&q=80"}
                    />


                    <Link to="/posts/new" style={{ padding: "10px" }} className="Link" >New</Link>
                    <Link to="/posts" style={{ padding: "10px" }} className="Link" >Home</Link>
                    {/* <Link to={`/profile/${currentUser?._id}`} style={{ padding: "10px" }} className="Link" >Profile</Link> */}
                    <Button onClick={handleLogout} variant="outlined">Logout</Button>

                </>
            ) :
                (
                    <>  <Link to="/register" style={{ padding: "10px" }}>Register</Link>
                        <Link to="/login">Login</Link>
                        <Link to="/posts/new" style={{ padding: "10px" }} >New</Link>
                    </>
                )}
        </nav>
    )
}

export default NavBar