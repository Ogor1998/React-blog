import React, { useState } from 'react'
import { Box } from '@mui/material'
import { TextField, InputAdornment, Button } from '@mui/material';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';


const Comments = ({ addComment, isLoggedIn }) => {
    const { id } = useParams();
    const [commentData, setCommentData] = useState({ content: "" })
    const navigate = useNavigate()
    const location = useLocation();
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!isLoggedIn) {
            navigate('/login',
                {
                    state: {
                        from: location,
                        error: "You need to be logged in to do that"
                    },

                })
            return;
        }

        console.log("SUBMIT CLICKED");
        try {
            const response = await axios.post(`/posts/${id}/comments`, commentData, { withCredentials: true })
            console.log(response.data)
            addComment(response.data)
            setCommentData({ content: "" });
        } catch (err) {
            console.error(err)
        }
    }
    const handleChange = (e) => {
        setCommentData(prev => ({
            ...prev, content: e.target.value
        }))
    }

    return (
        <Box
            component="form"
            sx={{ '& .MuiTextField-root': { m: 1, maxWidth: '100%' } }}
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit}
        >
            <TextField
                id="filled-multiline-static"
                label="Leave a comment"
                multiline
                rows={3}
                sx={{ width: '100%' }}
                value={commentData.content}

                name="content"
                variant="filled"
                slotProps={{
                    input: {
                        endAdornment: (
                            <>
                                {/* <InputAdornment position="end">
                                        <TextStyles />
                                    </InputAdornment> */}
                                <InputAdornment position="end">
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        size="small"
                                        sx={{ mt: 5 }}>
                                        Submit
                                    </Button>
                                </InputAdornment>
                            </>
                        ),
                    },
                }}
                onChange={handleChange}
            />
        </Box>
    )
}

export default Comments


