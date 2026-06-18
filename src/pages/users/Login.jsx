import React, { useState } from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';


const Login = ({ setMessage, setIsLoggedIn, setCurrentUser }) => {
    const [formData, setFormData] = useState({ username: "", password: "" })
    const [error, setError] = useState("")
    const navigate = useNavigate();
    const location = useLocation();

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }
    const handSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("/login", formData)
            setMessage(response.data.message)
            setIsLoggedIn(true)
            setCurrentUser({ username: response.data.user })
            navigate('/posts')

        }
        catch (err) {
            setError(err.response?.data?.message || "Login Failed")
            console.log(error)
        }
    }

    return (
        <Box>

            {error && <Alert icon={<CheckIcon fontSize="inherit" />} severity="error">
                {error}
            </Alert>}
            <Box
                component="form"
                onSubmit={handSubmit}
                sx={{
                    '& > :not(style)': { m: 1, width: '25ch' },
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    border: "1px solid #000"
                }}
                noValidate
                autoComplete="off"
            >
                <TextField id="outlined-basic" label="Username" variant="outlined" name='username' onChange={handleChange} value={formData.username} />
                <TextField id="outlined-basic" label="Password" variant="outlined" type='password' name='password' onChange={handleChange} value={formData.password} />
                <Button type='submit'>Login</Button>
            </Box>
        </Box>
    );


}
export default Login

