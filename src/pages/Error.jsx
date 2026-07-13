import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../components/context/AuthContext';
const Error = () => {
    const location = useLocation();
    const { message } = useAuth();
    const statusCode = location.state?.statusCode || 500
    const errorMessage = location.state?.message || message;
    console.log("location.state:", location.state)

    return (
        <Stack sx={{ width: '100%' }} spacing={2}>

            <Alert severity="error" sx={{ display: 'flex', justifyContent: 'center', fontSize: '30px' }}>
                <AlertTitle sx={{ fontSize: '20px' }}>{statusCode || 500}</AlertTitle>
                {errorMessage || "Something went wrong"}
            </Alert>
        </Stack>
    )
}

export default Error
