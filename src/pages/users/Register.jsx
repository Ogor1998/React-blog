import React, { useState } from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import axios from 'axios';
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';
import { useNavigate } from 'react-router-dom';
import UploadComponent from '../../components/UploadComponent';
import { Typography } from '@mui/material';

const Register = ({ setIsLoggedIn, setCurrentUser, setMessage }) => {
    console.log(typeof setIsLoggedIn);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        username: '',
        email: '',
        password: '',
        image: ''
    })
    const [error, setError] = useState("")
    const [file, setFile] = useState(null)
    const [preview, setPreview] = useState(null)

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }
    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const form = new FormData();
            form.append("firstname", formData.firstname)
            form.append("lastname", formData.lastname)
            form.append("username", formData.username)
            form.append("email", formData.email)
            form.append("password", formData.password)

            if (file) {
                form.append("image", file)
            }

            const response = await axios.post("http://localhost:3000/register", form,
                { withCredentials: true })
            setMessage(response.data.message)
            setIsLoggedIn(true)
            setCurrentUser(response.data.user)
            navigate('/posts')
        } catch (err) {
            console.log(err.response?.data);
            console.log(err.response?.status);
            console.log(err);
            setError(err.response?.data?.message || "Register Failed")
        }
    }
    return (
        <Box>
            {error && <Alert icon={<CheckIcon fontSize="inherit" />} severity="error">
                {error}
            </Alert>}
            <Box
                component="form"
                onSubmit={handleRegister}

                sx={{
                    '& > :not(style)': { m: 1, width: '50ch' },
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    // border: "1px solid #000"
                }}
                noValidate
                autoComplete="off"
            >
                <Typography variant='h3'>
                    Welcome to React Blog
                </Typography>
                <Typography variant='h5' color='secondary'>
                    Sign In here
                </Typography>
                <Box sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    flexDirection: 'row',
                    border: '1px solid black',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '10px',
                    padding: '20px'
                }}>

                    <TextField id="outlined-basic" label="FirstName" variant="outlined" name='firstname' value={formData.firstname} onChange={handleChange} />
                    <TextField id="outlined-basic" label="LastName" variant="outlined" name='lastname' value={formData.lastname} onChange={handleChange} />
                    <TextField id="outlined-basic" label="Username" variant="outlined" name='username' value={formData.username} onChange={handleChange} />
                    <TextField id="outlined-basic" label="Email" type='email' variant="outlined" name='email' value={formData.email} onChange={handleChange} />
                    <TextField id="outlined-basic" label="Password" variant="outlined" name='password' value={formData.password} onChange={handleChange} />

                    {preview && <img src={preview} width="200" />}
                    <UploadComponent setFile={setFile} setPreview={setPreview} />
                </Box>

                <Button type='submit' variant='outlined'>Register</Button>
            </Box>
        </Box>
    );
}


export default Register