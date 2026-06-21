import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
    Box,
    TextField,
    Button,
    Typography,
} from "@mui/material";
import UploadComponent from "./UploadComponent";

export default function ProfileEditComponent({ profile, setProfile, handleClick }) {
    const { id } = useParams();

    const [formData, setFormData] = useState({
        username: "",
        firstname: "",
        lastname: "",
        email: "",
        image: ""
    });
    const [preview, setPreview] = useState(null)
    const [file, setFile] = useState(null)

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axios.get(`/profile/${id}`);
                setFormData(response.data);
                setPreview(response.data.image)
            } catch (err) {
                console.error(err);
            }
        };

        fetchProfile();
    }, [id]);

    useEffect(() => {
        if (profile) {
            setFormData({
                username: profile.username || "",
                firstname: profile.firstname || "",
                lastname: profile.lastname || "",
                email: profile.email || "",
                image: profile.image || ""
            });
        }
    }, [profile]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();


        const form = new FormData();
        form.append("username", formData.username)
        form.append("email", formData.email)
        form.append("firstname", formData.firstname)
        form.append("lastname", formData.lastname)

        if (file) {
            form.append("image", file)
        }

        try {
            const response = await axios.put(`/profile/${id}`, form, {
                withCredentials: true,
            });
            setProfile(response.data)
            handleClick();
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
                maxWidth: 500,
                margin: "auto",
                mt: 5,
            }}
        >
            <Typography variant="h5">
                Edit Profile
            </Typography>

            <TextField
                label="Username"
                name="username"
                value={formData.username}
                onChange={handleChange}
            />

            <TextField
                label="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
            />

            <TextField
                label="First Name"
                name="firstname"
                value={formData.firstname}
                onChange={handleChange}
            />

            <TextField
                label="Last Name"
                name="lastname"
                value={formData.lastname}
                onChange={handleChange}
            />

            {preview && <img src={preview} width="200" />}
            <UploadComponent setFile={setFile} setPreview={setPreview} />


            <Box sx={{ display: 'flex', gap: '10px' }}>
                <Button
                    type="submit"
                    variant="contained"
                >
                    Save Changes
                </Button>
                <Button
                    onClick={() => handleClick()}
                    variant="contained"
                >
                    Cancel
                </Button>
            </Box>
        </Box>
    );
}