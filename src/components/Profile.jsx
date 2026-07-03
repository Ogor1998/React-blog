import { Box, Button } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProfileComponent from "./profile/ProfileComponent";
import ProfileEditComponent from "./profile/ProfileEditComponent";

export default function Profile({ isLoggedIn }) {
    const [profile, setProfile] = useState({})
    const [isEditting, setIsEditting] = useState(false)
    const { username } = useParams();
    console.log("username:", username);
    useEffect(() => {
        if (!username || username === "undefined") return;
        const profileFunc = async () => {
            const response = await axios.get(`/profile/${username}`)
            setProfile(response.data)
            console.log(response.data)
        }
        profileFunc();
    }, [username])
    const handleClick = () => {
        setIsEditting(prev => !prev);
        console.log(isEditting)
    }
    return (
        <Box>
            {!isEditting ? <ProfileComponent profile={profile} handleClick={handleClick} isLoggedIn={isLoggedIn} />
                : <ProfileEditComponent handleClick={handleClick} profile={profile} setProfile={setProfile} />
            }
        </Box>
    )
}