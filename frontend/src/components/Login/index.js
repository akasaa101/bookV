import { Box, Button, Typography, TextField,Alert } from "@mui/material"
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from '../../store/actions';

const Login = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const loginState = useSelector(state => state.loginState);
    const dispatch = useDispatch()
    
    const renderButton = () => {
        switch (loginState) {
            case 'loading':
                return <Button disabled variant="contained" sx={{ width: '80%',color: 'white', fontSize: 18}}>Loading...</Button>
            case 'success':
                return <Button disabled variant="contained" sx={{ width: '80%',color: 'white', fontSize: 18}}>Login Successful</Button>
            case 'failed':
                return ( 
                    <Box sx={{ display: 'flex', flexDirection: 'column',alignItems: 'center',justifyContent:'center', width: '100%'}}>
                         <Button type="submit" variant="contained" sx={{ width: '80%',color: 'white', fontSize: 18}} onClick={handleSubmit}>Login</Button>
                         <Alert severity="warning">Login Failed</Alert>
                    </Box>
                    )
            default:
                return <Button type="submit" variant="contained" onClick={handleSubmit} sx={{ width: '80%',color: 'white', fontSize: 18}}>Login</Button>
    }
  };
    const handleSubmit = () => {
        dispatch(loginUser(username, password));
    };

    return (
        <Box sx={{display: 'flex', flexDirection:'column', alignItems:'center', width: '100%', height: '100%'}}>
            <Box sx={{width: '80%'}}>
              <Typography sx={{marginTop: 4}} variant="h6">Enter your credentials</Typography>
            </Box>
            <Box sx={{display: 'flex', width: '100%',height:'100%', paddingTop:2, flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                <TextField label="Username" variant="outlined" sx={{width: '80%', m:1}} onChange={event => setUsername(event.target.value)} value={username}/>
                <TextField type={"password"} label="Password" variant="outlined" sx={{width: '80%', m:1}} onChange={event => setPassword(event.target.value)} value={password}/>
            </Box>
            <Box sx={{display: 'flex', justifyContent: 'center',width:'100%', marginBottom: 4}}>
                 {renderButton()}
            </Box>
           
        </Box>
    )
}
export default Login