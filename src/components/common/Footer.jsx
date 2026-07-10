import { Box } from '@mui/material'
import React from 'react'
import { Typography } from '@mui/material'
import CopyrightIcon from '@mui/icons-material/Copyright';

const Footer = () => {
    return (
        <Box sx={{
            position: 'fixed', bottom: 0, left: 0, right: 0,
            textAlign: 'center',
            backgroundColor: '#e9ecef',
            height: '20px',
            // padding: '10px'
        }} >
            <Typography variant='h6' color='primary'
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '12px',
                }}> React Blog 2026 <CopyrightIcon sx={{ fontSize: 'inherit', marginLeft: '10px' }} /></Typography>
        </Box>
    )
}

export default Footer