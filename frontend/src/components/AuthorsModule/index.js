import { Button, ButtonGroup, Box, Typography } from "@mui/material"
import SelectedAuthor from "./SelectedAuthor"
import CreateAuthor from "./CreateAuthor"
import theme from '../../theme'
import { useSelector, useDispatch } from "react-redux"
import { openCreateAuthorTab, openEditAuthorTab } from "../../store/actions"
const AuthorsModule = () => {
    const dispatch = useDispatch()
    const selectedTab = useSelector(state=>state.authorsModuleTab)
    
    return (
        <Box sx={{display:'flex', flex:1, flexDirection: 'column', alignItems: 'center'}}>
            <Box sx={{display:'flex', width: '100%', justifyContent: 'center'}}>
                <Typography variant="h5" sx={{m:2}}>Authors Module</Typography>
            </Box>
            <Box sx={{m:1,display:'flex', flexDirection:'column', alignItems:'center', backgroundColor: theme.palette.background.default, width: '90%', height:'100%', borderRadius: 4}}> 
                <Box sx={{display: 'flex',width:'50%', m:2}}>
                    <ButtonGroup fullWidth variant="outlined" aria-label="outlined primary button group">
                        <Button variant={selectedTab === "create" ? "contained" : "outlined"} sx={{color: selectedTab === "create" ? 'white' : theme.palette.primary.main}} onClick={()=>dispatch(openCreateAuthorTab())}>New</Button>
                        <Button variant={selectedTab === "edit" ? "contained" : "outlined"} sx={{color: selectedTab === "edit" ? 'white' : theme.palette.primary.main}} onClick={()=>dispatch(openEditAuthorTab())}>Edit</Button>
                    </ButtonGroup>
                </Box>
                <Box sx={{height: '85%', width: '90%', backgroundColor: theme.palette.background.paper, borderRadius: 4}}>
                    { selectedTab === "create" ?  <CreateAuthor/> : <SelectedAuthor/>}
                </Box>
            </Box>
        </Box>
    )
}
export default AuthorsModule