import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from './store';
import { AppBar, Toolbar, Typography, Button, Container, Box } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

// Create a custom theme instance
const customTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#fff',
    },
    secondary: {
      main: '#fff',
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

const App: React.FC = () => {
  const user = useSelector((state: RootState) => state.user.user);

  return (
    <ThemeProvider theme={customTheme}>
      <Box sx={{ backgroundColor: '#333', minHeight: '100vh' }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Spaced Repetition App
            </Typography>
            {user ? (
              <Button color="secondary" component={Link} to="/logout" variant="outlined">
                Logout
              </Button>
            ) : (
              <>
                <Button color="secondary" component={Link} to="/login" variant="outlined" sx={{ mr: 2 }}>
                  Login
                </Button>
                <Button color="secondary" component={Link} to="/register" variant="contained">
                  Register
                </Button>
              </>
            )}
          </Toolbar>
        </AppBar>
        <Container maxWidth="sm" sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h1" component="h1" gutterBottom>
            Spaced Repetition App
          </Typography>
          <Typography variant="h4" sx={{ mb: 4 }}>
            Start learning today
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
            <Button variant="contained" color="secondary" component={Link} to="/flashcards">
              Flashcards
            </Button>
            <Button variant="contained" color="secondary" component={Link} to="/decks">
              Decks
            </Button>
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default App;