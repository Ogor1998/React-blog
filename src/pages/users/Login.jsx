import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button, Typography } from '@mui/material';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InputAdornment from '@mui/material/InputAdornment';
import { IconButton } from '@mui/material';
import { useAuth } from '../../components/context/AuthContext';
import GlitchText from '../../components/common/GlitchText';
import { Paper } from '@mui/material';
import './Form.css'

const Login = () => {
    const [formData, setFormData] = useState({ username: "", password: "" })
    const [error, setError] = useState("")
    const navigate = useNavigate();
    const location = useLocation();
    const { setIsLoggedIn, setCurrentUser, message, setMessage } = useAuth();
    const loginMessage = location.state?.message || message
    const [showPassword, setShowPassword] = useState(false)

    useEffect(() => {
        if (location.state?.error) {
            setError(location.state.error);
        }
    }, [location.state]);

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
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
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("/login", formData)
            setMessage(response.data.message)
            setIsLoggedIn(true)
            setCurrentUser(response.data.user)
            const from = location.state?.from?.pathname || "/posts";
            console.log("Redirecting to:", from);
            navigate(from, { replace: true })
        }
        catch (err) {
            const msg = err.response?.data?.message || loginMessage || "Login failed"
            setError(msg)
            console.log(msg)
        }
    }
    return (
        <Box component={Paper} elevation={3} sx={{ p: 2, m: 1, backgroundColor: '#e9ecef' }}>
            {loginMessage && <Alert
                icon={<CheckIcon fontSize="inherit" />}
                severity="error" onClose={() => setMessage("")} >
                {loginMessage}
            </Alert>}
            {error && <Alert
                icon={<CheckIcon fontSize="inherit" />}
                severity="error" onClose={() => setMessage("")} >
                {error}
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
                onSubmit={handleLogin}
                sx={{
                    '& > :not(style)': { m: 2, width: '50ch' }
                }}
                className='Login'
                noValidate
                autoComplete="off"
            >

                <Typography variant='h3' color='primary'>
                    Sign In here
                </Typography>
                <TextField id="outlined-basic" label="Username" variant="outlined" name='username' onChange={handleChange} value={formData.username} />
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
                <Button type='submit' variant='outlined' sx={{ fontSize: '16px' }}>Login</Button>
            </Box>
        </Box>
    );


}
export default Login

