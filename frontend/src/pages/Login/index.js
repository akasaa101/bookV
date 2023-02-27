import { Box, Typography } from '@mui/material'
import theme from '../../theme'
import { useState } from 'react'
import Login from '../../components/Login'
import Register from '../../components/Register'
const LoginPage = () => {
    const [selectedTab, setSelectedTab] = useState("login")
    return (
        <Box sx={{display: 'flex', justifyContent: 'center', alignItems:'center',width: '100%', height: '90vh', backgroundColor: '#2d3436'}}>
            <Box sx={{width: {xs : '90%', sm:'70%', md: '50%', lg: '40%', xl: '30%'},  height: '70%', backgroundColor: theme.palette.secondary.main, borderRadius: 4, p:2 }}>
                <Box sx={{display: 'flex', justifyContent: 'space-evenly',width: '100%'}}>
                    <Box sx={{
                        display: 'flex', 
                        justifyContent: 'center', 
                        width:'100%', 
                        backgroundColor: selectedTab==="login" ? theme.palette.background.default: theme.palette.secondary.main,
                        borderTopLeftRadius: 8,
                        borderTopRightRadius: 8,
                        cursor: 'pointer'
                        }}
                        onClick={()=>setSelectedTab("login")}>
                        <Typography sx={{m:1}} variant='h5' color={selectedTab==="login" ? "black" : "white"}>Login</Typography>
                    </Box>
                    <Box sx={{
                        display: 'flex', 
                        justifyContent: 'center', 
                        backgroundColor: selectedTab==="register" ? theme.palette.background.default: theme.palette.secondary.main,                        
                        width:'100%',
                        borderTopLeftRadius: 8,
                        borderTopRightRadius: 8,
                        cursor: 'pointer'
                        }}
                        onClick={()=>setSelectedTab("register")}>
                        <Typography sx={{m:1}} variant='h5' color={selectedTab==="register" ? "black" : "white"}>Register</Typography>
                    </Box>
                    
                </Box>
                <Box sx={{
                    width: '100%', 
                    height: '90%', 
                    backgroundColor: theme.palette.background.default, 
                    borderBottomLeftRadius: 8, 
                    borderBottomRightRadius: 8, 
                    borderTopLeftRadius: selectedTab==="register" ? 8: 0,
                    borderTopRightRadius: selectedTab==="login" ? 8: 0 }}>
                        {
                            selectedTab === "login" ?  <Login /> : <Register />
                        }
                </Box>
            </Box>
        </Box>
    )
}

export default LoginPage