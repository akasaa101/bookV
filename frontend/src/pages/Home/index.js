import { Box } from '@mui/material'
import BooksModule from '../../components/BooksModule'
import AuthorsModule from '../../components/AuthorsModule'
import DashboardModule from '../../components/DashboardModule'
const Home = () => {
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