import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import '../components/New.css'
import { InputAdornment, IconButton, Button } from '@mui/material';
import SendIcon from '@mui/icons-material/Send'
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Typography } from '@mui/material';
import UploadComponent from './UploadComponent';
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';

export default function Edit({ setMessage, message }) {
    const [formData, setFormData] = useState({ title: "", content: "", author: "", image: "" })
    const navigate = useNavigate();
    const { id } = useParams();
    const [preview, setPreview] = useState(null)
    const [file, setFile] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(`/posts/${id}`)
            setFormData(response.data)
            setPreview(response.data.image)
        }
        fetchData();
    }, [id])

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const form = new FormData();
        form.append("title", formData.title)
        form.append("content", formData.content)
        if (file) {
            form.append("image", file)
        }

        try {
            await axios.patch(`/posts/${id}`, form)
            navigate(`/posts/${id}`)
        }
        catch (err) {
            setMessage(err.response?.message)
        }

    }
    const maxLength = 300;
    return (
        <Box
            component="form"
            sx={{ '& .MuiTextField-root': { m: 1, width: '50ch' } }}
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit}
        >
            {message && <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
                {message}
            </Alert>}
            <div className='New' >
                <Typography variant="h5" component="h2" sx={{ width: '70%', textAlign: 'left', padding: '5px' }}>
                    Update Post
                </Typography>
                <TextField
                    id="filled-multiline-flexible"
                    label="Title"
                    name="title"
                    multiline
                    value={formData.title}
                    maxRows={4}
                    variant="filled"
                    onChange={handleChange}
                // inputProps={{ maxLength: maxLength }}
                />

                <h4 style={{ color: formData.title.length >= maxLength ? "red" : "black", textAlign: "right", width: '70%', margin: "0px", fontSize: '13px' }}>{formData.title.length}/{maxLength}</h4>
                <TextField
                    id="filled-multiline-static"
                    label="Content"
                    multiline
                    rows={5}
                    sx={{ width: '100%' }}
                    value={formData.content}
                    name="content"
                    variant="filled"
                    slotProps={{
                        input: {
                            endAdornment: (
                                <InputAdornment position="end">
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        size="small"
                                        sx={{ mt: 11 }}>
                                        Update
                                    </Button>
                                </InputAdornment>
                            ),
                        },
                    }}
                    onChange={handleChange}

                />
                {/* <TextField
                    id="filled-multiline-flexible"
                    label="Image Link"
                    name="image"
                    multiline
                    value={formData.image}
                    maxRows={4}
                    variant="filled"
                    onChange={handleChange}
                // inputProps={{ maxLength: maxLength }}
                /> */}
                {preview && <img src={preview} width="200" />}
                <UploadComponent setFile={setFile} setPreview={setPreview} />


            </div>

        </Box>
    );
}