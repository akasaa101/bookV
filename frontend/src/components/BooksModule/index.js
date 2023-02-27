import { Button, Box, Typography } from "@mui/material"
import SelectedBook from "./SelectedBook"
import theme from '../../theme'
const BooksModule = () => {
    return(
        <Box sx={{display:'flex', flex:1, flexDirection: 'column', alignItems: 'center'}}>
            <Box sx={{display:'flex', width: '100%', justifyContent: 'center'}}>
                <Typography variant="h5" sx={{m:2}}>Books Module</Typography>
            </Box>
            <Box sx={{m:1,display:'flex', flexDirection:'column', alignItems:'center', backgroundColor: theme.palette.background.default, width: '90%', height:'100%', borderRadius: 4 }}>
                <Box sx={{display: 'flex',width:'50%', m:2}}>
                    <Button fullWidth variant="outlined">Create new book</Button>
                </Box>
                <Box sx={{height: '70%', width: '90%', backgroundColor: theme.palette.background.paper}}>
                    <SelectedBook/>
                </Box>
            </Box>
        </Box>
    )
}
export default BooksModule