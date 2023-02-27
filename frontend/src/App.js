import {
  BrowserRouter,
  Route,
  Routes,
  Navigate
} from "react-router-dom";
import { ThemeProvider, createTheme } from '@mui/material/styles'
import theme from './theme';
import Login from './pages/Login';
import Home from './pages/Home';
import Header from './components/Header';
import { useSelector } from "react-redux";

function App() {
  const loginState = useSelector(state => state.loginState);

  const isAuthenticated = loginState==="success"

  return (
      <ThemeProvider theme={createTheme(theme)}>
      <BrowserRouter>
       <Header />
      <Routes>
        <Route path="/" element={
            !isAuthenticated ? <Login /> :  <Navigate to="/home" replace />
          } />
        <Route
        path="/home"
          element={
            isAuthenticated ? <Home /> :  <Navigate to="/" replace />
          }
        />
      </Routes>
      </BrowserRouter>
      </ThemeProvider>
  );
}

export default App;
