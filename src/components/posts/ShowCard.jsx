import React, { useState } from 'react'
import { Card, Typography, CardContent, CardMedia } from '@mui/material'
import { Box } from '@mui/material'
import { Button } from '@mui/material'
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Link } from 'react-router-dom';
import IosShareIcon from '@mui/icons-material/IosShare';
import LinkCopy from '../../Utils/MiddleWareReact';
import { motion, AnimatePresence } from 'motion/react';
import CheckIcon from '@mui/icons-material/Check';

const ShowCard = ({ formData, isAuthor, handleCommnetShow, likeCounter, updateLikeCount, alreadyLiked, setMessage }) => {
    const MotionButton = motion(Button);
    const [text, setText] = useState("Share")
    const [isClicked, setIsClicked] = useState(false)
    const updateText = () => {
        if (!isClicked) {
            LinkCopy(formData._id, setMessage)
            setText("Link Copied")
            setIsClicked(true)
            setTimeout(() => {
                setIsClicked(false)
                setText("Share")
                console.log('timeout is working', isClicked)
            }, 3000)
        }


    }
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
                <MotionButton
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={updateText}
                    animate={{
                        scale: isClicked ? [1, 1.08, 1] : 1
                    }}
                    transition={{
                        duration: 0.4
                    }}
                    variant="outlined"
                    color={isClicked ? "success" : "primary"}
                >
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={isClicked ? "success" : "share"}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "8px",
                            }}
                        >
                            {isClicked ? <CheckIcon /> : <IosShareIcon />}
                            {text}
                        </motion.div>
                    </AnimatePresence>
                </MotionButton>
                {/* <Button variant='outlined'><Share</Button> */}
                {isAuthor && <Link to={`/posts/${formData._id}/edit`} >
                    <MotionButton
                        variant='outlined'
                        color='error'
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >Edit</MotionButton></Link>}
            </Box>

        </Card >
    )
}

export default ShowCard