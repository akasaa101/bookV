import { Button, Box, FormControl, InputLabel, Select, MenuItem, TextField, Typography } from "@mui/material"
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { postBook, openEditBookTab } from "../../../store/actions";
const CreateBook = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("")
    const [isbn, setIsbn] = useState("")
    const [author, setAuthor] = useState("");
    
    const dispatch = useDispatch()
    const authors = useSelector(state=>state.authors)
    const token = useSelector(state=>state.token)
    const capitalizeName = (str) => {
        return str
          .toLowerCase()
          .split(" ")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ");
    };

    const handleSubmit = () => {
        dispatch(postBook(token,author, title, description, isbn))
        dispatch(openEditBookTab())
    }

    const handleChange = (event) => {
      setAuthor(event.target.value);
    };
    
    return (
        <Box sx={{width: '100%', height:'100%'}}>
            <Box sx={{display: 'flex', flexDirection: 'column', height: '100%',justifyContent: 'space-evenly', alignItems: 'center', marginLeft: 2, marginRight: 2}}>
                <Typography>Create a new Book</Typography>
                <TextField fullWidth variant='outlined' label="Title" value={title} onChange={e=>setTitle(capitalizeName(e.target.value))}/>
                <TextField fullWidth variant='outlined' label="Description" value={description} onChange={e=>setDescription(e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1))}/>
                <TextField fullWidth type="tel" variant='outlined' label="ISBN" value={isbn} onChange={e=>setIsbn(e.target.value)}/>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Author</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={author}
                        label="Author"
                        onChange={handleChange}
                    >{
                        authors.map((author, index)=> (
                            <MenuItem value={author.id}>{author.name}</MenuItem>
                        ))
                    }
                    </Select>
                </FormControl>
                <Button variant="outlined" onClick={handleSubmit}>Submit</Button>
            </Box>
        </Box>
    )
}

export default CreateBook;