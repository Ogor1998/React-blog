
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Box } from '@mui/material';
import { useParams, Link, useNavigate } from 'react-router-dom';
import CommentComponent from '../../components/comments/CommentComponent';
import Comments from '../../components/comments/Comments';
import CircularProgress from '@mui/material/CircularProgress';
import { useLocation } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';
import ShowCard from '../../components/posts/ShowCard';
import { useAuth } from '../../components/context/AuthContext';



export default function Show() {
    const { id: postId } = useParams();
    const [formData, setFormData] = useState(null)
    const [comments, setComments] = useState([])
    const [isComment, setIsComment] = useState(false)
    const [likeCounter, setLikeCounter] = useState(0)
    const navigate = useNavigate();
    const location = useLocation();
    const successMessage = location.state?.success;
    const errorMessage = location.state?.error;
    const [message, setMessage] = useState("")
    const { isLoggedIn, currentUser } = useAuth();
    useEffect(() => {
        if (!postId) return;
        const fetchData = async () => {
            try {
                const response = await axios.get(`/posts/${postId}`);
                setFormData(response.data)
                setComments(response.data.comments)
                setLikeCounter(response.data.likes.length)
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
    const updateLikeCount = async () => {
        try {
            const alreadyLiked = formData.likes?.some(likeId => likeId.toString() === currentUser?._id)
            if (alreadyLiked) {
                const response = await axios.delete(`/posts/${postId}/like`)
                setLikeCounter(response.data.likes)
                setFormData(prev => ({ ...prev, likes: prev.likes.filter(id => id.toString() !== currentUser._id) }))
            } else {
                const response = await axios.post(`/posts/${postId}/like`, {}, { withCredentials: true })
                setLikeCounter(response.data.likes)
                setFormData(prev => ({ ...prev, likes: [...prev.likes, currentUser._id] }))
            }
        } catch (err) {
            setMessage(err.response?.message)
        }
    }

    if (!formData) return <CircularProgress aria-label="Loading…" />
    const isAuthor = currentUser
        && formData.author
        && currentUser._id === formData.author._id;
    const alreadyLiked = formData.likes?.some(likeId => likeId.toString() === currentUser?._id)

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            {successMessage && <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
                {successMessage}
            </Alert>}
            {errorMessage && <Alert icon={<CheckIcon fontSize="inherit" />} severity="error">
                {errorMessage}
            </Alert>}
            {message && <Alert icon={<CheckIcon fontSize="inherit" />} severity="success" onClose={() => setMessage("")}>
                {message}
            </Alert>}
            <h1>{formData.title}</h1>
            <ShowCard formData={formData} isAuthor={isAuthor} handleCommnetShow={handleCommnetShow} likeCounter={likeCounter} updateLikeCount={updateLikeCount} alreadyLiked={alreadyLiked} setMessage={setMessage} />


            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>


                {isComment && <Comments addComment={addComment} isLoggedIn={isLoggedIn} />}

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
