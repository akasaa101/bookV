import { Box,Typography } from "@mui/material"
import theme from '../../theme'
const Header = () => {
    return (
        <Box sx={{
            display:'flex', 
            justifyContent: 'center', 
            alignItems:'center', 
            width: '100%', 
            backgroundColor: theme.palette.secondary.main , 
            height: '10vh' 
            }}>
            <Typography variant="h4" color="white">Book Case</Typography>
        </Box>
    )
}
export default Header