import { Button, Box, Typography } from "@mui/material"
import { useSelector } from "react-redux"
import MenuBookIcon from '@mui/icons-material/MenuBook';
import theme from '../../../theme'
const SelectedBook = () => {
    const selected = useSelector(state => state.selectedBook)
    const AuthorInfos = ({book}) => {
        return (
            <Box sx={{display: 'flex', flexDirection:'column', alignItems:'center', width: '100%'}}>
                <Box sx={{display: 'flex', m: 2, justifyContent: 'center', alignItems: 'center', width: 100, height: 100, borderRadius: 50, backgroundColor: theme.palette.background.default}}>
                    <MenuBookIcon sx={{fontSize: 80}}/>
                </Box>
                <Box sx={{display: 'flex', width: '100%'}}>
                    <Typography sx={{m:2}}>Title: </Typography>
                    <Typography sx={{m:2}}>{book.title}</Typography>
                </Box>
                <Box sx={{display: 'flex', width: '100%'}}>
                    <Typography sx={{m:2}}>Description: </Typography>
                    <Typography sx={{m:2}}>{book.description}</Typography>
                </Box>
            </Box>
        )
    }
    return (
        <Box sx={{width: '100%', height:'100%'}}>
            <Box sx={{m:2}}>
                {selected.title ? (
                    <>
                <AuthorInfos book={selected}/>
                <Box sx={{display: 'flex',width:'90%', m:2}}>
                    <Button fullWidth variant="outlined" color="secondary">Edit existing book</Button>
                </Box>
                </>
                ): <Typography>Please select an author from the dashbod module</Typography> }
                
            </Box>
        </Box>
    )
}

export default SelectedBook