import { Button, Box, TextField, Typography } from '@mui/material'
import { useState } from 'react'
import { openEditAuthorTab, postAuthor } from '../../../store/actions'
import { useDispatch } from 'react-redux'

const CreateAuthor = () => {
    const dispatch = useDispatch()
    const [name, setName] = useState("")
    const handleSubmit = () => {
        dispatch(postAuthor(name))
        dispatch(openEditAuthorTab())
    }
    const capitalizeName = (str) => {
        return str
          .toLowerCase()
          .split(" ")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ");
    };
    return (
         <Box sx={{width: '100%', height:'100%'}}>
            <Box sx={{display: 'flex', flexDirection: 'column', height: '100%',justifyContent: 'space-evenly', alignItems: 'center', m:2}}>
                <Typography>Create a new Author</Typography>
                <TextField variant='outlined' label="Name" value={name} onChange={e=>setName(capitalizeName(e.target.value))}/>
                <Button variant="outlined" onClick={handleSubmit}>Submit</Button>
            </Box>
        </Box>
    )
}
export default CreateAuthor