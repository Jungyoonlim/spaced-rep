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
    h1: {
      fontSize: '3rem',
      fontWeight: 'bold',
    },
  },
});

const App: React.FC = () => {
  const user = useSelector((state: RootState) => state.user.user);

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
      <Container maxWidth="xl">
      <Toolbar sx={{ justifyContent: 'space-between', padding: '0 24px' }}>
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
        </Container>
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
          <Typography variant="h1" component="h2" gutterBottom sx={{
            fontSize: '4rem',
            fontWeight: 'bold',
            textAlign: 'center', 
            width: '100%', 
          }}>
            Learn Everything.<br />Right Instantly.
          </Typography>
          <Typography variant="h5" sx={{ mb: 4 }}>
            Start learning today
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
          <Button variant="contained" color="secondary" component={Link} to="/flashcards" sx={{
              fontSize: '1.4rem',
              padding: '10px 32px',
              borderRadius: '10px',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
            }}>              
            Flashcards
            </Button>
            <Button variant="contained" color="secondary" component={Link} to="/decks" sx={{
              fontSize: '1.4rem',
              padding: '10px 32px',
              borderRadius: '10px',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
            }}>
              Decks
            </Button>
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default App;
