import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';
import { useLocation } from 'react-router-dom';

const Error = () => {
    const location = useLocation();
    const statusCode = location.state?.statusCode || 500
    const message = location.state?.message || "Something went wrong"
    console.log("location.state:", location.state)

    return (
        <Stack sx={{ width: '100%' }} spacing={2}>

            <Alert severity="error" sx={{ display: 'flex', justifyContent: 'center', fontSize: '30px' }}>
                <AlertTitle sx={{ fontSize: '20px' }}>{statusCode || 500}</AlertTitle>
                {message || "Something went wrong"}
            </Alert>
        </Stack>
    )
}

export default Error
