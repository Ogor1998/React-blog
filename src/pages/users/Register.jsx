import React, { useState } from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import axios from 'axios';
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';
import { useNavigate } from 'react-router-dom';
import UploadComponent from '../../components/posts/UploadComponent';
import { Typography } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InputAdornment from '@mui/material/InputAdornment';
import { IconButton } from '@mui/material';
import AvatarUpload from '../../components/profile/AvatarUpload';
import { useAuth } from '../../components/context/AuthContext';
import GlitchText from '../../components/common/GlitchText';
import { Paper } from '@mui/material';
import './Form.css'
const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        username: '',
        email: '',
        password: '',
        image: ''
    })
    // const [error, setError] = useState("")
    const [file, setFile] = useState(null)
    const [preview, setPreview] = useState(null)
    const [showPassword, setShowPassword] = useState(false)
    const { setIsLoggedIn, message, setMessage, setCurrentUser } = useAuth();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleClickShowPassword = () => {
        setShowPassword((show) => !show)
    }
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleMouseUpPassword = (event) => {
        event.preventDefault();
    };
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
            setMessage(err.response?.data?.message || "Register Failed")
        }
    }
    return (

        <Box className='Main_Box'>
            <Box component={Paper} elevation={3}
                sx={{
                    p: 2,
                    backgroundColor: 'e9ecef'
                }}
                className='form__box'>
                {message && <Alert icon={<CheckIcon fontSize="inherit" />} severity="error" onClose={() => setMessage("")}>
                    {message}
                </Alert>}


                <GlitchText
                    speed={1}
                    enableShadows
                    enableOnHover={false}
                    className='custom-class'
                >
                    React Blog
                </GlitchText>
                <Box
                    component="form"
                    onSubmit={handleRegister}
                    className='Register'
                    sx={{
                        '& > :not(style)': { m: 0.5, width: '55ch' },

                    }}

                    noValidate
                    autoComplete="off"
                >
                    <Typography variant='h5' color='primary'>
                        Sign Up here
                    </Typography>

                    <Box><AvatarUpload setFile={setFile} />
                        <Box className='Register_Box'>

                            <TextField id="outlined-basic" label="FirstName" variant="outlined" name='firstname' value={formData.firstname} onChange={handleChange} />
                            <TextField id="outlined-basic" label="LastName" variant="outlined" name='lastname' value={formData.lastname} onChange={handleChange} />
                            <TextField id="outlined-basic" label="Username" variant="outlined" name='username' value={formData.username} onChange={handleChange} />
                            <TextField id="outlined-basic" label="Email" type='email' variant="outlined" name='email' value={formData.email} onChange={handleChange} />
                            <TextField
                                id="outlined-basic"
                                label="Password"
                                variant="outlined"
                                name='password'
                                onChange={handleChange}
                                value={formData.password}
                                type={showPassword ? 'text' : 'password'}
                                slotProps={{
                                    input: {
                                        endAdornment: (
                                            < InputAdornment position="end" >
                                                <IconButton
                                                    aria-label={
                                                        showPassword ? 'hide the password' : 'display the password'
                                                    }
                                                    onClick={handleClickShowPassword}
                                                    onMouseDown={handleMouseDownPassword}
                                                    onMouseUp={handleMouseUpPassword}
                                                >
                                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        )

                                    }
                                }

                                }
                            />
                            {/* {preview && <img src={preview} width="200" />}
                    <UploadComponent setFile={setFile} setPreview={setPreview} /> */}

                        </Box>
                    </Box>

                    <Button type='submit' variant='outlined'>Register</Button>
                </Box>
            </Box>
            <Box className='image__box'>
                <img src="https://images.unsplash.com/vector-1738590593450-647695dbf9d0?q=80&w=1760&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt=""
                    className='image'
                />
            </Box>
        </Box>
    );
}


export default Register