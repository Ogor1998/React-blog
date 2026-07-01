import React from 'react'
import { Card, Typography, CardContent, CardMedia } from '@mui/material'
import { Box } from '@mui/material'
import { Button } from '@mui/material'
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Link } from 'react-router-dom';
import IosShareIcon from '@mui/icons-material/IosShare';

const ShowCard = ({ formData, isAuthor, handleCommnetShow, likeCounter, updateLikeCount, alreadyLiked }) => {
    return (
        <Card sx={{ width: "100%", padding: "10px" }}>
            <CardMedia
                component="img"
                sx={{ height: 300 }}
                image={formData.image}
                title="green iguana"
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {formData.title}
                </Typography>
                <Typography gutterBottom variant="h5" component="div">
                    Post by {formData.author?.username}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {formData.content}
                </Typography>
            </CardContent>
            <Box >
                <Button
                    variant="outlined"
                    color={alreadyLiked ? 'error' : 'primary'}
                    startIcon={<FavoriteIcon />}
                    onClick={updateLikeCount}
                    sx={{ justifySelf: 'flex-end' }}
                >
                    {likeCounter}
                </Button>
                <Button variant='outlined' color='success' sx={{ margin: '10px' }} onClick={() => handleCommnetShow()}>Comment</Button>
                <Button variant='outlined'><IosShareIcon />Share</Button>
                {isAuthor && <Link to={`/posts/${formData._id}/edit`} ><Button variant='outlined' color='error'>Edit</Button></Link>}
            </Box>

        </Card >
    )
}

export default ShowCard