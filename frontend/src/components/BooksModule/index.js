import { Button, ButtonGroup, Box, Typography } from "@mui/material"
import SelectedBook from "./SelectedBook"
import CreateBook from "./CreateBook"
import theme from '../../theme'
import { openCreateBookTab, openEditBookTab } from "../../store/actions"
import { useSelector, useDispatch } from "react-redux"
const BooksModule = () => {
    const dispatch = useDispatch()
    const selectedTab = useSelector(state=>state.booksModuleTab)

    return(
        <Box sx={{display:'flex', flex:1, flexDirection: 'column', alignItems: 'center'}}>
            <Box sx={{display:'flex', width: '100%', justifyContent: 'center'}}>
                <Typography variant="h5" sx={{m:2}}>Books Module</Typography>
            </Box>
            <Box sx={{m:1,display:'flex', flexDirection:'column', alignItems:'center', backgroundColor: theme.palette.background.default, width: '90%', height:'100%', borderRadius: 4 }}>
                 <Box sx={{display: 'flex',width:'50%', m:2}}>
                    <ButtonGroup fullWidth variant="outlined" aria-label="outlined primary button group">
                        <Button variant={selectedTab === "create" ? "contained" : "outlined"} sx={{color: selectedTab === "create" ? 'white' : theme.palette.primary.main}} onClick={()=>dispatch(openCreateBookTab())}>New</Button>
                        <Button variant={selectedTab === "edit" ? "contained" : "outlined"} sx={{color: selectedTab === "edit" ? 'white' : theme.palette.primary.main}} onClick={()=>dispatch(openEditBookTab())}>Edit</Button>
                    </ButtonGroup>
                </Box>
                <Box sx={{height: '85%', width: '90%', backgroundColor: theme.palette.background.paper, borderRadius: 4}}>
                    { selectedTab === "create" ?  <CreateBook/> : <SelectedBook/>}
                </Box>
            </Box>
        </Box>
    )
}
export default BooksModule