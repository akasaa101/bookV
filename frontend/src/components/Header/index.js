import { Box,Tooltip,Typography } from "@mui/material"
import { useSelector, useDispatch } from "react-redux"
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import theme from '../../theme'
import { logout } from "../../store/actions";
const Header = () => {
    const dispatch = useDispatch()
    const displayName = useSelector(state=>state.displayName)
    const handleLogout = () => {
        dispatch(logout())
    }
    return (
        <Box sx={{
            display:'flex', 
            justifyContent: 'space-around', 
            alignItems:'center', 
            width: '100%', 
            backgroundColor: theme.palette.secondary.main , 
            height: '10vh' 
            }}>
            {displayName.length>0 ? (
                <Box sx={{position: 'absolute', left: 50}}>
                    <Typography sx={{color: 'white', fontSize: 28}}>Wellcome, {displayName}</Typography>
                </Box>
            ) : <></>
            }
            <Box sx={{display: 'flex', justifyContent:'center', width: '100%'}}>
                <Typography variant="h4" color="white">Book Case</Typography>
            </Box>
            {displayName.length>0 ? (
                <Box sx={{position: 'absolute', right: 50}} onClick={handleLogout} >
                    <Tooltip title="Logout">
                        <ExitToAppIcon sx={{color: 'white', fontSize: 40, cursor: 'pointer'}}/>
                    </Tooltip>
                </Box>
                ) : <></>
            }
        </Box>
    )
}
export default Header