import { useState } from 'react'
import { Button, Box, TextField, Typography } from "@mui/material"
import { useSelector, useDispatch } from "react-redux"
import MenuBookIcon from '@mui/icons-material/MenuBook';
import EditIcon from '@mui/icons-material/Edit';
import theme from '../../../theme'
import { putBook } from '../../../store/actions';

const SelectedBook = () => {
    const selected = useSelector(state => state.selectedBook)
    const token = useSelector(state => state.token)
    const authors = useSelector(state => state.authors)
    const dispatch = useDispatch() 
    const BookInfos = ({book}) => {
        const [hover, setHover] = useState("")
        const [title, setTitle] = useState(book.title)
        const [description, setDescription] = useState(book.description)
        const [isbn, setIsbn] = useState(book.isbn)
        const [author, setAuthor] = useState(authors.find(item => item.id === book.authorId).name)
        const [price, setPrice] = useState(book.price)
        const [editedList, setEditedList] = useState([]) 
        const handleEditClick = (item) => {
            if(!editedList.includes(item)) setEditedList([...editedList, item])
        }
        const handleSubmitClick = () => {
            dispatch(putBook(token, book.id, {title, description, isbn, author: authors.find(item => item.name === author).id, price},))
        }
        return (
            <Box sx={{display: 'flex', flexDirection:'column', alignItems:'center', width: '100%'}}>
                <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', width: 100, height: 100, borderRadius: 50, backgroundColor: theme.palette.background.default}}>
                    <MenuBookIcon sx={{fontSize: 70, color: theme.palette.secondary.main}}/>
                </Box>
                <Box sx={{display: 'flex', alignItems: 'center', width: '100%', m:1}}>
                    <Box sx={{display: 'flex', flex: 1}}>
                        <Typography sx={{m:1}}>Title: </Typography>
                    </Box>
                    <Box sx={{display: 'flex', flex: 2}}>
                    {
                        editedList.includes("title") ?
                        (
                            <TextField size="small" variant='outlined' value={title} onChange={e=>setTitle(e.target.value)}/>
                        ):
                        (
                            <Box sx={{display: 'flex', alignItems: 'center', cursor: 'pointer'}} onClick={()=>handleEditClick("title")}>
                                <Typography onMouseEnter={()=>setHover("title")} onMouseLeave={()=>setHover("false")} sx={{m:1}}>{book.title}</Typography>
                                { hover === "title" ? <EditIcon sx={{ fontSize: 20}} /> : <></>}
                            </Box>
                        )
                    }
                   </Box>
                </Box>
                <Box sx={{display: 'flex', width: '100%', m:1}}>
                    <Box sx={{display: 'flex', flex: 1}}>
                        <Typography sx={{m:1}}>Description: </Typography>
                    </Box>
                    <Box sx={{display: 'flex', flex: 2}}>
                    {
                        editedList.includes("description") ?
                        (
                            <TextField size="small" variant='outlined' value={description} onChange={e=>setDescription(e.target.value)}/>
                        ):
                        (
                            <Box sx={{display: 'flex', alignItems: 'center', cursor: 'pointer'}} onClick={()=>handleEditClick("description")}>
                                <Typography onMouseEnter={()=>setHover("description")} onMouseLeave={()=>setHover("false")} sx={{m:1}}>{book.description}</Typography>
                                { hover === "description" ? <EditIcon sx={{ fontSize: 20}} /> : <></>}
                            </Box>
                        )
                    }
                    </Box>
                </Box>
                <Box sx={{display: 'flex', width: '100%', m:1}}>
                    <Box sx={{display: 'flex', flex: 1}}>
                        <Typography sx={{m:1}}>ISBN: </Typography>
                    </Box>
                    <Box sx={{display: 'flex', flex: 2}}>
                    {
                        editedList.includes("isbn") ?
                        (
                            <TextField type="tel" size="small" variant='outlined' value={isbn} onChange={e=>setIsbn(e.target.value)}/>
                        ):
                        (
                    <Box sx={{display: 'flex', alignItems: 'center', cursor: 'pointer'}} onClick={()=>handleEditClick("isbn")}>
                        <Typography onMouseEnter={()=>setHover("isbn")} onMouseLeave={()=>setHover("false")} sx={{m:1}}>{book.isbn}</Typography>
                        { hover === "isbn" ? <EditIcon sx={{ fontSize: 20}} /> : <></>}
                    </Box>
                        )
                    }
                    </Box>
                </Box>
                <Box sx={{display: 'flex', width: '100%', m:1}}>
                    <Box sx={{display: 'flex', flex: 1}}>
                        <Typography sx={{m:1}}>Author: </Typography>
                    </Box>
                    <Box sx={{display: 'flex', flex: 2}}>
                    {
                        editedList.includes("author") ?
                        (
                            <TextField size="small" variant='outlined' value={author} onChange={e=>setAuthor(e.target.value)}/>
                        ):
                        (
                    <Box sx={{display: 'flex', alignItems: 'center', cursor: 'pointer'}} onClick={()=>handleEditClick("author")}>
                        <Typography onMouseEnter={()=>setHover("author")} onMouseLeave={()=>setHover("false")} sx={{m:1}}>{authors.find(item => item.id === book.authorId).name}</Typography>
                        { hover === "author" ? <EditIcon sx={{ fontSize: 20}} /> : <></>}
                    </Box>
                        )
                    }
                    </Box>
                </Box>
                <Box sx={{display: 'flex', width: '100%', m:1}}>
                    <Box sx={{display: 'flex', flex: 1}}>
                        <Typography sx={{m:1}}>Price: </Typography>
                    </Box>
                    <Box sx={{display: 'flex', flex: 2}}>
                    {
                        editedList.includes("price") ?
                        (
                            <TextField size="small" variant='outlined' value={price} onChange={e=>setPrice(e.target.value)}/>
                        ):
                        (
                    <Box sx={{display: 'flex', alignItems: 'center', cursor: 'pointer'}} onClick={()=>handleEditClick("price")}>
                        <Typography onMouseEnter={()=>setHover("price")} onMouseLeave={()=>setHover("false")} sx={{m:1}}>{book.price ? book.price.toFixed(2) : "There is no price"}</Typography>
                        { hover === "price" ? <EditIcon sx={{ fontSize: 20}} /> : <></>}
                    </Box>
                        )
                    }
                    </Box>
                    
                </Box>
                {( 
                   editedList.length>0 && (description !== book.description || title !== book.title || price !== book.price || isbn !== book.isbn || author !== authors.find(item => item.id === book.authorId).name)
                    )? 
                (
                    <Box sx={{display: 'flex',width:'90%', m:2}}>
                        <Button fullWidth variant="outlined" color="secondary" onClick={()=>handleSubmitClick()}>Edit existing book</Button>
                    </Box>
                )
            :
                (
                    <></>
                )}
                
            </Box>
        )
    }
    return (
        <Box sx={{width: '100%', height:'100%'}}>
            <Box sx={{m:2}}>
                {selected.title ? (
                    <>
                <BookInfos book={selected}/>
                </>
                ): <Typography>Please select an author from the dashbod module</Typography> }
                
            </Box>
        </Box>
    )
}

export default SelectedBook