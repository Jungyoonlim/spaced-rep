
import React, { useState } from 'react';
import { Link } from 'react-router-dom'; 
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setUser } from '../store';
import { CreateUserDto } from '../../shared/types';
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

const Register: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const registerData: CreateUserDto = { name, email, password };
    fetch('/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(registerData),
    })
      .then(response => response.json())
      .then(data => {
        dispatch(setUser(data));
        navigate('/');
      })
      .catch(error => {
        console.error('Registration failed:', error);
        // TODO: Display error message to the user
      });
  };

  return (
    <ThemeProvider theme={customTheme}>
      <Box sx={{ backgroundColor: '#333', minHeight: '100vh' }}>
      <AppBar position="static">
        <Toolbar>
      <Button color="secondary" component={Link} to="/" variant="contained" sx={{ fontSize: '1.1rem', padding: '10px 12px' }}>
          Return
        </Button>
        </Toolbar>
      </AppBar>
      <Container maxWidth="sm" sx={{ textAlign: 'center', py: 8 }}>
      <Toolbar>
      <form onSubmit={handleSubmit}>
        <Typography variant="h3" component="h2" gutterBottom>
          Register
        </Typography>
        <TextField
          label="Name"
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />
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
          Register
        </Button>
      </form>
      </Toolbar>
      </Container>
      </Box>
    </ThemeProvider>
  );
};

export default Register;

