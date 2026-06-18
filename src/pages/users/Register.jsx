import React, { useState } from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import axios from 'axios';
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';
import { useNavigate } from 'react-router-dom';



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
    const [error, setError] = useState("")

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }
    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:3000/register", formData,
                { withCredentials: true })
            if (response.status === 200) navigate('/posts')
        } catch (err) {
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
                    '& > :not(style)': { m: 1, width: '25ch' },
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    border: "1px solid #000"
                }}
                noValidate
                autoComplete="off"
            >
                <TextField id="outlined-basic" label="FirstName" variant="outlined" name='firstname' value={formData.firstname} onChange={handleChange} />
                <TextField id="outlined-basic" label="LastName" variant="outlined" name='lastname' value={formData.lastname} onChange={handleChange} />
                <TextField id="outlined-basic" label="Username" variant="outlined" name='username' value={formData.username} onChange={handleChange} />
                <TextField id="outlined-basic" label="Email" type='email' variant="outlined" name='email' value={formData.email} onChange={handleChange} />
                <TextField id="outlined-basic" label="Password" variant="outlined" name='password' value={formData.password} onChange={handleChange} />
                <TextField id="outlined-basic" label="Image url" variant="outlined" name='image' value={formData.image} onChange={handleChange} />
                <Button type='submit'>Register</Button>
            </Box>
        </Box>
    );
}


export default Register