import { Button, Box, Typography, TextField } from "@mui/material"
import { useSelector, useDispatch } from "react-redux"
import PersonIcon from '@mui/icons-material/Person';
import EditIcon from '@mui/icons-material/Edit';
import theme from '../../../theme'
import { useState } from "react";
import { putAuthor } from "../../../store/actions";

const SelectedAuthor = () => {
    const selected = useSelector(state => state.selectedAuthor)
    const dispatch = useDispatch()
    const AuthorInfos = ({author}) => {
        const [hover, setHover] = useState(false)
        const [editName, setEditName] = useState(author.name)
        const [onEdit, setOnEdit] = useState(false)
        const capitalizeName = (str) => {
        return str
          .toLowerCase()
          .split(" ")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ");
        };

        const handleEdit = () => {
            dispatch(putAuthor(author.id ,editName))
        }
        return (
            <Box sx={{display: 'flex', flexDirection:'column', alignItems:'center', width: '100%'}}>
                <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', width: 100, height: 100, borderRadius: 50, backgroundColor: theme.palette.background.default}}>
                    <PersonIcon color="secondary" sx={{fontSize: 80}}/>
                </Box>
                <Box sx={{display: 'flex', width: '100%', marginTop:2}}>
                    <Box sx={{display:'flex', flex: 1}}>
                        <Typography sx={{m:2}}>Name: </Typography>
                    </Box>
                    <Box sx={{display:'flex', flex: 1, justifyContent: 'center'}}>
                        
                   
                    {
                        onEdit ? 
                        (
                            <Box sx={{display: 'flex',width:'100%', alignItems: 'center', flexDirection:'column'}}>
                                <TextField size="small" value={editName} onChange={(e)=>setEditName(capitalizeName(e.target.value))} />
                                {editName!==author.name ? (
                                    <Box sx={{display: 'flex',width:'70%', marginTop:3}}>
                                        <Button onClick={handleEdit} fullWidth variant="outlined" color="secondary">Edit</Button>
                                    </Box>
                                ):
                                <></>}
                            </Box>
                        )
                        :
                        (
                        <Box sx={{display:'flex', width:'100%', flexDirection:'row', alignItems:'center', cursor: 'pointer'}} onClick={()=>setOnEdit(true)}>
                            <Typography onMouseEnter={()=>setHover(true)} onMouseLeave={()=>setHover(false)} sx={{m:2}}>{author.name}</Typography>
                            { hover ? <EditIcon sx={{ fontSize: 20}} /> : <></>}
                        </Box>
                        )
                    }
                     </Box>
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
                
                </>
                ): <Typography>Please select an author from the dashbod module</Typography> }
            </Box>
        </Box>
    )
}

export default SelectedAuthor