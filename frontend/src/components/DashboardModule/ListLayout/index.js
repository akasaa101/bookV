import { Box, Typography } from "@mui/material"
import { useDispatch } from "react-redux"
import { openEditBookTab, openEditAuthorTab, selectAuthor, selectBook } from "../../../store/actions"
import theme from '../../../theme'
const ListLayout = ({data, title}) => {
    const ListItem = ({item, key}) => {
        const dispatch = useDispatch();
        const handleOnClick = () => {
            if(item.description){
                dispatch(selectBook(item))
                dispatch(openEditBookTab())
            }
            else{
                dispatch(selectAuthor(item))
                dispatch(openEditAuthorTab())
            }
        }
        return (
            <Box sx={{display: 'flex', justifyContent: 'space-around',m:1,p:1, borderRadius: 4, width: '90%', backgroundColor: theme.palette.background.paper, cursor: 'pointer'}} key={key} onClick={handleOnClick}>
                {item.description ?
                ( 
                    <>
                        <Typography>{item.title}</Typography>
                        <Typography>{item.description}</Typography>
                    </>
                )
                :
                        <Typography>{item.name}</Typography>
            }
            </Box>
        )
    }
    return (
        <Box sx={{display: 'flex', flex: 1,flexDirection: 'column', backgroundColor: theme.palette.background.default, m:1, width: '100%', alignItems: 'center', borderRadius:4}}>
            <Box>
                <Typography sx={{m:1}} variant="h6" color="primary">{title}</Typography>
            </Box>
            <Box sx={{display: 'flex', flexDirection:'column', alignItems: 'center', width: '100%'}}>
                <Box sx={{display: 'flex', width:'100%', justifyContent: 'space-around'}}>
                    <Typography color="secondary">Name</Typography>
                    {title!=="Last Authors" ? <Typography color="secondary">Description</Typography> : <></>}
                </Box>
                <Box sx={{display: 'flex', flexDirection:'column',alignItems:'center', maxHeight: 220,overflow:'auto', width: '100%'}}>
                    {data.slice(0).reverse().map((item, index)=><ListItem item={item} key={index}/>)}
                </Box>
            </Box>
        </Box>
    )
}

export default ListLayout