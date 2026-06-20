import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import '../components/New.css'
import { InputAdornment, IconButton, Button } from '@mui/material';
import SendIcon from '@mui/icons-material/Send'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Typography } from '@mui/material';
import TextStyles from './TextStyles';
import UploadComponent from './UploadComponent';


export default function New() {
    const [formData, setFormData] = useState({ title: "", content: "", author: "" })
    const [file, setFile] = useState(null)
    const [preview, setPreview] = useState(null)
    const navigate = useNavigate();
    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }



    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = new FormData();
        form.append("title", formData.title);
        form.append("content", formData.content);
        form.append("category", formData.category || "");
        form.append("image", file || "");

        // console.log([...form.entries()]);
        // console.log(file);

        try {
            const response = await axios.post("/posts/new", form,
                { withCredentials: true })
            console.log("Success", response.data)
            navigate("/posts")
        } catch (err) {
            console.log("Error status:", err.response?.status)
            console.log("Error message:", err.response?.data)
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

            <div className='New' >
                <Typography variant="h5" component="h2" sx={{ textAlign: 'left', padding: '5px' }}>
                    Create Post
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
                    rows={20}
                    sx={{ width: '100%' }}
                    value={formData.content}
                    name="content"
                    variant="filled"
                    onChange={handleChange}

                />
                {preview && <img src={preview} width="200" />}
                <Box sx={{ display: 'flex', gap: '10px' }}>
                    <UploadComponent setFile={setFile} setPreview={setPreview} />
                    <Button
                        type="submit"
                        variant="contained"
                        size="large"
                    >
                        Submit
                    </Button>
                </Box>
            </div>

        </Box>
    );
}