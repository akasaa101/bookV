import { Box } from '@mui/material'
import BooksModule from '../../components/BooksModule'
import AuthorsModule from '../../components/AuthorsModule'
import DashboardModule from '../../components/DashboardModule'
/* import { useEffect } from 'react'
import { io } from 'socket.io-client' */

const Home = () => {
    /* const socket = io('http://localhost:4000');

    useEffect(() => {
        socket.on('bookList', (bookList) => {
          console.log(bookList);
        });
    }, [socket]); */
    return (
        <Box sx={{display:'flex', flexDirection: { xs: 'column', sm : 'column', md: 'column' },height: '90vh'}}>
            <Box sx={{ display: 'flex', flexDirection: 'row', height: '100%'}}>
                <AuthorsModule />
                <DashboardModule />
                <BooksModule/>
            </Box>
        </Box>
    )
}

export default Home