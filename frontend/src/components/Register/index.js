import { Box, Button, Typography, TextField, Alert } from "@mui/material"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { registerUser } from "../../store/actions"
const Register = () => {
    const dispatch = useDispatch();
    const [username, setUsername] = useState("")
    const [displayName, setDisplayName] = useState("")
    const [password, setPassword] = useState("")
    const loginState = useSelector(state => state.loginState);

    const renderButton = () => {
        switch (loginState) {
            case 'loading':
                return <Button disabled variant="contained" sx={{ width: '80%',color: 'white', fontSize: 18}}>Loading...</Button>
            case 'success':
                return <Button disabled variant="contained" sx={{ width: '80%',color: 'white', fontSize: 18}}>Login Successful</Button>
            case 'failed':
                return ( 
                    <Box sx={{ display: 'flex', flexDirection: 'column',alignItems: 'center',justifyContent:'center', width: '100%'}}>
                         <Button variant="contained" sx={{ width: '80%',color: 'white', fontSize: 18}} onClick={handleSubmit}>Login</Button>
                         <Alert severity="warning">Login Failed</Alert>
                    </Box>
                    )
            default:
                return <Button variant="contained" onClick={handleSubmit} sx={{ width: '80%',color: 'white', fontSize: 18}}>Login</Button>
    }
  };

    const handleSubmit = () => {
        dispatch(registerUser(username, displayName, password));
    };

    return (
        <Box sx={{display: 'flex', alignItems: 'center', flexDirection:'column', width: '100%', height: '100%'}}>
            <Box sx={{width: '80%'}}>
              <Typography sx={{marginTop: 4}} variant="h6">Enter your info for register</Typography>
            </Box>
            <Box sx={{display: 'flex', width: '100%',height:'100%',  flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                <TextField value={username} onChange={event => setUsername(event.target.value)} label="Username" variant="outlined" sx={{width: '80%', m:1}}  />
                <TextField value={displayName} onChange={event => setDisplayName(event.target.value)} label="Display Name" variant="outlined" sx={{width: '80%', m:1}} />
                <TextField type={"password"} value={password} onChange={event => setPassword(event.target.value)} label="Password" variant="outlined" sx={{width: '80%', m:1}} />
            </Box>
            <Box sx={{display: 'flex', justifyContent: 'center',width:'100%', marginBottom: 4}}>
                {renderButton()}
            </Box>
        </Box>
    )
}
export default Register