import { Box } from '@mui/material'
import React from 'react'
import { Typography } from '@mui/material'
import CopyrightIcon from '@mui/icons-material/Copyright';

const Footer = () => {
    return (
        <Box sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, textAlign: 'center', backgroundColor: '#000' }} >
            <Typography variant='h5' color='primary'
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}> React Blog 2026 <CopyrightIcon /></Typography>
        </Box>
    )
}

export default Footer