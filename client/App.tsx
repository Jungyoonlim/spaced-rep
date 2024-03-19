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
              <Button color="secondary" component={Link} to="/logout" variant="outlined" sx={{ padding: '6px 12px' }}>
                Logout
              </Button>
            ) : (
              <>
                <Button color="secondary" component={Link} to="/login" variant="outlined" sx={{ fontSize: '1.1rem', padding: '8px 10px', mr: 2 }}>
                  Login
                </Button>
                <Button color="secondary" component={Link} to="/register" variant="contained" sx={{ fontSize: '1.1rem', padding: '8px 10px' }}>
                  Register
                </Button>
              </>
            )}
          </Toolbar>
        </AppBar>
        <Container maxWidth="sm" sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h1" component="h2" gutterBottom>
            Spaced Repetition App
          </Typography>
          <Typography variant="h5" sx={{ mb: 4 }}>
            Start learning today
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
            <Button variant="contained" color="secondary" component={Link} to="/flashcards" sx={{ fontSize: '1.4rem', padding: '10px 32px', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
              Flashcards
            </Button>
            <Button variant="contained" color="secondary" component={Link} to="/decks" sx={{ fontSize: '1.4rem', padding: '10px 32px', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
              Decks
            </Button>
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default App;
