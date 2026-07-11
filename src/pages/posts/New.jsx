import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import '../posts/New.css'
import { InputAdornment, IconButton, Button } from '@mui/material';
import SendIcon from '@mui/icons-material/Send'
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Typography } from '@mui/material';
import TextStyles from '../../components/posts/TextStyles';
import UploadComponent from '../../components/posts/UploadComponent';
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';



export default function New({ message, setMessage }) {
    const [formData, setFormData] = useState({ title: "", content: "", author: "" })
    const [file, setFile] = useState([])
    const [previews, setPreviews] = useState([])
    const [helper, setHelper] = useState(null)
    const navigate = useNavigate();
    const location = useLocation();
    const errorMessage = location.state?.message;
    const handleChange = (e) => {
        const { name, value } = e.target
        if (name === "title" && value.length > 300) return
        setFormData(prev => ({ ...prev, [name]: value }))
    }
    const helperFunc = () => {
        if (formData.title.length <= 5) {
            setHelper("Title must be at least 5 characters long")
        }
        else {
            setHelper(null)
        }
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = new FormData();
        form.append("title", formData.title);
        form.append("content", formData.content);
        form.append("category", formData.category || "");
        file.forEach((image) => {
            form.append("image", image);
        });

        try {
            const response = await axios.post("/posts/new", form,
                { withCredentials: true })
            console.log("Success", response.data)
            setMessage("")
            navigate("/posts", {
                state: {
                    message: "Successfully created new post"
                }
            })
        } catch (err) {
            setMessage(err.response?.data)
            console.log("Error status:", err.response?.status)
            console.log("Error message:", err.response?.data)
        }
    }
    // console.log("message on New page:", message)
    const maxLength = 300;

    return (
        <Box
            component="form"
            sx={{
                '& .MuiTextField-root': {
                    m: 1,
                    width: '50ch',
                    maxWidth: 700,
                    width: '100%',
                    mx: 'auto',

                }
            }}

            noValidate
            autoComplete="off"
            onSubmit={handleSubmit}
        >
            {message && <Alert severity="error" onClose={() => setMessage("")}>
                {message}
            </Alert>}

            <div className='New' >
                <Typography variant="h5" component="h2" sx={{ textAlign: 'left', padding: '5px' }}>
                    Create Post
                </Typography>
                <TextField
                    id="filled-multiline-flexible"
                    label="Title"
                    name="title"
                    error={!!helper}
                    multiline
                    value={formData.title}
                    maxRows={4}
                    variant="filled"
                    onChange={handleChange}
                    onBlur={() => helperFunc()}
                    helperText={helper}
                // slotProps={{
                //     htmlInput: { maxLength: maxLength }
                // }}
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

                <Box sx={{ display: "flex", gap: 2, overflow: 'scroll' }}>
                    {previews.map((src, index) => (
                        <img
                            src={src}
                            key={index}
                            alt={`preview-${index}`}
                            width="150"
                        />
                    ))}
                </Box>

                <Box sx={{ display: 'flex', gap: '10px', m: 1 }}>
                    <UploadComponent setFile={setFile} setPreviews={setPreviews} />
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