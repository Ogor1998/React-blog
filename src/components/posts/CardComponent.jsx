import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import VisibilityIcon from '@mui/icons-material/Visibility';
import '../common/NavBar.css';
import LinkCopy from '../../utils/MiddleWareReact';
import { useAuth } from '../context/AuthContext';
import { Box } from '@mui/material';
export default function CardComponent({ id, item, handleDelete }) {
    const { isLoggedIn, currentUser, setMessage } = useAuth();
    const deletePost = async () => {
        console.log("deletePost called")
        try {
            await handleDelete(id)
            setMessage('Post Deleted Successfully')
        } catch (error) {
            setMessage(error?.message)
        }
    }
    const isAuthor =
        currentUser &&
        item.author &&
        currentUser._id === item.author._id;

    const isLoggedInAndIsAuthor = isAuthor && isLoggedIn
    return (

        <Card sx={{ maxWidth: 345 }}>
            <CardMedia
                component="img"
                sx={{ height: 140 }}
                image={item.image}
                title={item.title}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {item.title}
                </Typography>
                <Typography gutterBottom variant="h1" component="div" sx={{ fontSize: '12px' }}>
                    {new Date(item.createdAt).toLocaleString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                        hour: "numeric",
                        minute: "2-digit"
                    })}
                </Typography>
                <Typography gutterBottom variant="h1" component="div" sx={{ fontSize: '12px' }}>
                    Post by {item.author?.username || item.author || "Anonymous"}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {item.content.substring(0, 50) + '...'}
                </Typography>
            </CardContent>
            <CardActions sx={{ display: 'flex', alignItems: 'center' }}>
                <Button size="small" onClick={() => LinkCopy(item._id, setMessage)}>Share</Button>

                <Button size="small">
                    <Link to={`/posts/${item._id}`} ><VisibilityIcon color='alert' /></Link></Button>
                {isLoggedInAndIsAuthor && <Button size="small" onClick={(e) => {
                    console.log("Button clicked")
                    e.stopPropagation();
                    deletePost();
                }}>
                    Delete
                </Button>}
            </CardActions>

        </Card >
    );
}
