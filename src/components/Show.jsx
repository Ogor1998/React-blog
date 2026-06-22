import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Box } from '@mui/material';
import { useParams, Link, useNavigate } from 'react-router-dom';
import CommentComponent from './CommentComponent';
import Comments from './Comments';
import CircularProgress from '@mui/material/CircularProgress';
import { useLocation } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';


export default function Show({ isLoggedIn, currentUser }) {
    const { id: postId } = useParams();
    const [formData, setFormData] = useState(null)
    const [error, setError] = useState(null)
    const [comments, setComments] = useState([])
    const [isComment, setIsComment] = useState(false)
    const navigate = useNavigate();
    const location = useLocation();
    const successMessage = location.state?.success


    useEffect(() => {
        if (!postId) return;
        const fetchData = async () => {
            try {
                const response = await axios.get(`/posts/${postId}`);
                setFormData(response.data)
                setComments(response.data.comments)
            } catch (err) {
                navigate("/error", {
                    state: {
                        statusCode: err.response?.status,
                        message: err.response?.data?.message
                    }
                })
            }
            // console.log(response.data)
        }
        fetchData();
    }, [postId])

    useEffect(() => {
        console.log("COMMENTS:", comments);
    }, [comments]);

    const addComment = (newComment) => {
        setComments((prev) => [...prev, newComment])
    }

    const handleDelete = async (id) => {
        await axios.delete(`/posts/${postId}/comments/${id}`);
        console.log(id);
        setComments(prev => prev.filter(c => c._id !== id))
    }
    const handleCommnetShow = () => {
        setIsComment(!isComment)
    }

    if (!formData) return <CircularProgress aria-label="Loading…" />
    const isAuthor = currentUser
        && formData.author
        && currentUser._id === formData.author._id;
    // console.log("this is the:", formData)

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            {successMessage && <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
                {successMessage}
            </Alert>}
            <h1>{formData.title}</h1>
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
                    <Button variant='outlined' color='success' sx={{ margin: '10px' }} onClick={() => handleCommnetShow()}>Comment</Button>
                    {isAuthor && <Link to={`/posts/${formData._id}/edit`} ><Button variant='outlined' color='error'>Edit</Button></Link>}
                </Box>

            </Card >


            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>

                {isComment && <Comments addComment={addComment} />}

                {comments.map(item => (<CommentComponent
                    key={item._id}
                    item={item}
                    handleDelete={handleDelete}
                    isLoggedIn={isLoggedIn}
                    isAuthor={isAuthor}
                    currentUser={currentUser}
                // isPostAuthor={currentUser?._id === formData.author?._id}
                />))}

            </Box>
        </Box >
    );
}
