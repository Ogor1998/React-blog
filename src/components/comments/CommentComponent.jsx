import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';
import DeleteComponent from '../common/DeleteComponent';
import { useNavigate } from 'react-router';

export default function CommentComponent({ item, handleDelete, isLoggedIn, currentUser, isAuthor }) {
    console.log(item.author);
    const isCommentAuthor = currentUser?._id === item.author?._id;
    // const isPostAuthor = currentUser?._id === item.author?._id;
    const canDelete = isLoggedIn && (isCommentAuthor || isAuthor)
    // const LoggedInAndAuthor = isLoggedIn && isCommentAuthor;
    const navigate = useNavigate();
    const visitProfile = () => {
        return navigate(`/profile/${item.author?.username}`)
    }
    return (
        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', marginTop: '5px' }}>
            <ListItem alignItems="flex-start">
                <ListItemAvatar onClick={() => visitProfile()}>
                    <Avatar src={item.author?.image} />
                </ListItemAvatar>
                <ListItemText
                    primary={item.author?.username || 'anonymous'}
                    secondary={
                        <React.Fragment>
                            <Typography
                                component="span"
                                variant="body2"
                                sx={{ color: 'text.primary', display: 'inline' }}
                            >
                                {item.content}

                            </Typography>

                        </React.Fragment>
                    }
                />
                <Typography gutterBottom variant="h1" component="div" sx={{ fontSize: '12px', alignSelf: 'center' }}>
                    {new Date(item.createdAt).toLocaleString("en-US", {
                        month: "short",
                        day: "numeric",
                        hour: "numeric",
                        minute: "2-digit"
                    })}
                </Typography>
                {/* {isLoggedIn && <Button onClick={() => handleDelete(item._id)} variant="outlined" color="error">Delete</Button>} */}
                {canDelete && <DeleteComponent handleDelete={handleDelete} item={item} />}
            </ListItem>
        </List>
    );
}
