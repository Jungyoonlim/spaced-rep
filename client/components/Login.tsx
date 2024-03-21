
import React, { useState } from 'react';
import { Link } from 'react-router-dom'; 
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setUser } from '../store';
import { LoginUserDto } from '../../shared/types';
import { AppBar, TextField, Button, Typography, Container, Box, Toolbar } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const customTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#fff',
    },
    secondary: {
      main: '#f8c8dc',
    },
    background: {
      default: '#333',
      paper: '#333',
    },
  },
  typography: {
    fontFamily: '"Playfair Display", serif',
    allVariants: {
      color: '#fff',
    },
  },
});

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const loginData: LoginUserDto = { email, password };
    fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(loginData),
    })
      .then(response => response.json())
      .then(data => {
        dispatch(setUser(data));
        navigate('/');
      })
      .catch(error => {
        console.error('Login failed:', error);
        // TODO: Display error message to the user
      });
  };

  return (
    <ThemeProvider theme={customTheme}>
      <Box sx={{
        backgroundColor: '#333',
        minHeight: '100vh',
        backgroundImage: 'linear-gradient(to bottom right, #444, #222)', 
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center', 
      }}>
      <AppBar position="static" sx={{
          backgroundColor: '#f8c8dc',
          boxShadow: 'none',
          mx: 'auto',
          maxWidth: 'calc(100% - 48px)',
          borderRadius: 50,
          mt: 2, 
        }}>
      <Toolbar sx={{ justifyContent: 'space-between', padding: '0 24px' }}>
      <Button color="secondary" component={Link} to="/" variant="contained" sx={{ fontSize: '1.1rem', padding: '8px 10px' }}>
          Return
        </Button>
        </Toolbar>
      </AppBar>
      <Container sx={{
          textAlign: 'center',
          py: 8,
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center', 
          alignItems: 'center', 
        }}>
      <Toolbar>
      <form onSubmit={handleSubmit}>
      <Typography variant="h3" component="h2" gutterBottom>
          Login
        </Typography>
      <TextField
        label="Email"
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
      />
      <TextField
        label="Password"
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        required
      />
      <Button type="submit" variant="contained">
        Login
      </Button>
    </form>
      </Toolbar>
      </Container>
      </Box>
    </ThemeProvider>
  );
};

export default Login;

