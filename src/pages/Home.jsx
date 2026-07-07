import React, { useEffect, useState } from 'react'
import axios from 'axios'
import CardComponent from '../components/posts/CardComponent';
import { useParams, Link, useLocation } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';
import { Box, Pagination, Stack } from '@mui/material';
import "./Home.css"
import SearchField from '../components/SearchField';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { useAuth } from '../components/context/AuthContext';
import Paginate from '../utils/paginate';
import { useMemo } from 'react';



export default function Home() {
    const [theData, settheData] = useState([])
    const [search, setSearch] = useState("")
    const location = useLocation();
    const { isLoggedIn, currentUser, message, setMessage } = useAuth();
    const postMessage = location.state?.message || message;
    const handleChange = (e) => {
        setSearch(e.target.value)
        // console.log("It's working")
    }
    const handleDelete = async (id) => {
        try {
            const response = await axios.delete(`/posts/${id}`);
            console.log(response.data)
            settheData(prev => prev.filter(post => post._id !== id))
        } catch (error) {
            console.log(error)
        }
    }
    const filterData = useMemo(() => {
        return theData.filter(item => item.title.toLowerCase().includes(search.toLowerCase()))
    }, [theData, search])

    const [currentPage, setCurrentPage] = useState(0)
    const displayData = search ? filterData : theData;
    const pages = Paginate(displayData);
    const currentItems = pages[currentPage] || [];

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get('http://localhost:3000/posts')
            settheData(response.data)
        }
        fetchData();
    }, [])


    return (
        <Box sx={{ pb: 12, minHeight: "100vh" }}>
            <SearchField handleChange={handleChange} />
            {postMessage && (
                <Alert
                    severity="success"
                    icon={<CheckIcon fontSize="inherit" />}
                    onClose={() => setMessage("")}
                >
                    {postMessage}
                </Alert>
            )}
            <Box sx={{ '& > :not(style)': { m: 1 } }}>
                <Fab
                    color="primary"
                    aria-label="add"
                    component={Link}
                    to="/posts/new"
                    sx={{
                        position: "fixed",
                        bottom: 24,
                        right: 24,
                        zIndex: 1000
                    }}
                >
                    <AddIcon />
                </Fab>
            </Box>

            <div className='Home'>

                {currentItems.map(item =>
                    <CardComponent
                        key={item._id}
                        id={item._id}
                        item={item}
                        handleDelete={handleDelete}
                        isLoggedIn={isLoggedIn}
                        currentUser={currentUser}
                        setMessage={setMessage}
                    />
                )}
            </div>
            <div className='Pagination'>
                <Stack spacing={2}>
                    <Pagination
                        count={pages.length}
                        page={currentPage + 1}
                        onChange={(event, value) => setCurrentPage(value - 1)}
                        color="primary"
                    />
                </Stack>



            </div>

        </Box>

    )
}



