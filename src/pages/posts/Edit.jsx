import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import '../posts/New.css'
import { InputAdornment, IconButton, Button } from '@mui/material';
import SendIcon from '@mui/icons-material/Send'
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Typography } from '@mui/material';
import UploadComponent from '../../components/posts/UploadComponent';
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';
import { useAuth } from '../../components/context/AuthContext';
import Delete from '@mui/icons-material/Delete';
import { div } from 'motion/react-client';

export default function Edit() {
    const [formData, setFormData] = useState({ title: "", content: "", author: "", image: "" })
    const navigate = useNavigate();
    const { id } = useParams();
    const [previews, setPreviews] = useState([])
    const [file, setFile] = useState(null)
    const { setMessage, message } = useAuth()

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(`/posts/${id}`)
            setFormData(response.data)
            console.log(response.data.image)
            setPreviews(response.data.image)
        }
        fetchData();
    }, [id])
    const handleDelete = (idx) => {
        console.log('getting clicked')
        setPreviews(prev =>
            prev.filter((_, index) => index !== idx))
        // setFile(prev =>
        //     prev.filter((_, index) => index !== idx)
        // );
    }
    const handleChange = (e) => {
        const { name, value } = e.target
        if (name === "title" && value.length > 300) return
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
            navigate(`/posts/${id}`,
                {
                    state: {
                        success: "Post updated successfully"
                    }
                })
        }
        catch (err) {
            setMessage(err.response?.data?.message || "Failed to update post")
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
            {message && <Alert icon={<CheckIcon fontSize="inherit" />} severity="success" onClose={() => setMessage("")}>
                {message}
            </Alert>}
            <div className='New' >
                <Typography variant="h5" component="h2" sx={{ textAlign: 'left', padding: '5px' }}>
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

                <h4 style={{ color: formData.title.length >= maxLength ? "red" : "black", textAlign: "right", margin: "0px", fontSize: '13px' }}>{formData.title.length}/{maxLength}</h4>
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

                                </InputAdornment>
                            ),
                        },
                    }}
                    onChange={handleChange}

                />


                <Box sx={{ display: "flex", gap: 2, overflow: 'scroll' }}>
                    {previews.map((src, index) => (
                        <div key={index}>
                            <label htmlFor={index}></label>
                            <img
                                src={src}
                                alt={`preview-${index}`}
                                width="150"
                            />
                            <Delete onClick={() => handleDelete(index)} />
                        </div>
                    ))}
                </Box>

                <Box sx={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                    <UploadComponent setFile={setFile} setPreviews={setPreviews} />
                    <Button
                        type="submit"
                        variant="contained"
                        size="xl"
                    >
                        Update
                    </Button>
                </Box>

            </div>

        </Box>
    );
}