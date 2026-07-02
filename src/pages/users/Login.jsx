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

const Login = ({ setMessage, setIsLoggedIn, setCurrentUser, message }) => {
    const [formData, setFormData] = useState({ username: "", password: "" })
    const [error, setError] = useState("")
    const navigate = useNavigate();
    const location = useLocation();
    const loginMessage = location.state?.message || message
    const [showPassword, setShowPassword] = useState(false)

    useEffect(() => {
        if (location.state?.error) {
            setError(location.state.error);
        }
    }, [location.state]);

    // useEffect(() => {
    //     console.log("location.state:", location.state);
    // }, [location]);

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
        <Box>
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
            <Box
                component="form"
                onSubmit={handleLogin}
                sx={{
                    '& > :not(style)': { m: 2, width: '50ch' },
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: 'center',
                    border: "1px solid #000",
                    height: '70ch'
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
                <TextField id="outlined-basic" label="Username" variant="outlined" name='username' onChange={handleChange} value={formData.username} />
                <TextField
                    id="outlined-basic"
                    label="Password"
                    variant="outlined"
                    // type='password'
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

