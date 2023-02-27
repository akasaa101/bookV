import { Button, Box, Typography } from "@mui/material"
import { useSelector } from "react-redux"
import PersonIcon from '@mui/icons-material/Person';
import theme from '../../../theme'
const SelectedAuthor = () => {
    const selected = useSelector(state => state.selectedAuthor)
    const AuthorInfos = ({author}) => {
        return (
            <Box sx={{display: 'flex', flexDirection:'column', alignItems:'center', width: '100%'}}>
                <Box sx={{display: 'flex', m: 2, justifyContent: 'center', alignItems: 'center', width: 100, height: 100, borderRadius: 50, backgroundColor: theme.palette.background.default}}>
                    <PersonIcon sx={{fontSize: 80}}/>
                </Box>
                <Box sx={{display: 'flex', width: '100%'}}>
                    <Typography sx={{m:2}}>Name: </Typography>
                    <Typography sx={{m:2}}>{author.name}</Typography>
                </Box>
            </Box>
        )
    }
    return (
        <Box sx={{width: '100%', height:'100%'}}>
            <Box sx={{m:2}}>
                {selected.name ? (
                    <>
                <AuthorInfos author={selected}/>
                <Box sx={{display: 'flex',width:'90%', m:2}}>
                    <Button fullWidth variant="outlined" color="secondary">Edit existing author</Button>
                </Box>
                </>
                ): <Typography>Please select an author from the dashbod module</Typography> }
                
            </Box>
        </Box>
    )
}

export default SelectedAuthor