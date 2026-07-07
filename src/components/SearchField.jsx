import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useState } from 'react';

export default function SearchField({ handleChange }) {


    return (
        <Box
            component="form"
            sx={{ '& .MuiTextField-root': { m: 1, maxWidth: '100%' } }}
            noValidate
            autoComplete="off"
        >
            <div>

                <TextField id="outlined-search" label="Search Posts" type="search" onChange={handleChange} />
            </div>

        </Box>
    );
}
