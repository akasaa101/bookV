import { Box, Typography } from "@mui/material"
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux"
import { getBooks, getAuthors } from "../../store/actions";
import ListLayout from "./ListLayout";

const DashboardModule = () => {

    const dispatch = useDispatch()
    const books = useSelector(state => state.books);
    const authors = useSelector(state => state.authors);
    useEffect(()=>{
        dispatch(getAuthors())
        dispatch(getBooks())
    },[])

    return (
         <Box sx={{display:'flex', flex:1}}>
            <Box sx={{display:'flex', flexDirection: 'column', width: '100%', alignItems: 'center'}}>
                <Typography variant="h5" sx={{m:2}}>Dashboard Module</Typography>
                <ListLayout data={books} title="Last Books"/>
                <ListLayout data={authors} title="Last Authors"/>
            </Box>
        </Box>
    )
}
export default DashboardModule