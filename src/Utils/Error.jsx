import axios from 'axios'
import { useEffect, useState } from 'react'
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';
import { useLocation } from 'react-router-dom';

const Error = () => {
    const { state } = useLocation();

    return (
        <Stack sx={{ width: '100%' }} spacing={2}>

            <Alert severity="error" sx={{ display: 'flex', justifyContent: 'center', fontSize: '30px' }}>
                <AlertTitle sx={{ fontSize: '20px' }}>{state?.statusCode || 500}</AlertTitle>
                {state?.message || "Something went wrong"}
            </Alert>
        </Stack>
    )
}

export default Error
