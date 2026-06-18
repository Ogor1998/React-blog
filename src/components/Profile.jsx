import { Box, Button } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProfileComponent from "./ProfileComponent";
import ProfileEditComponent from "./ProfileEditComponent";

export default function Profile() {
    const [profile, setProfile] = useState({})
    const [isEditting, setIsEditting] = useState(false)
    const { id } = useParams();
    useEffect(() => {
        const profileFunc = async () => {
            const response = await axios.get(`/profile/${id}`)
            setProfile(response.data)
            console.log(response.data)
        }
        profileFunc();
    }, [id])
    const handleClick = () => {
        setIsEditting(prev => !prev);
        console.log(isEditting)
    }
    return (
        <Box>
            {!isEditting ? <ProfileComponent profile={profile} handleClick={handleClick} />
                : <ProfileEditComponent handleClick={handleClick} profile={profile} setProfile={setProfile} />
            }
        </Box>
    )
}