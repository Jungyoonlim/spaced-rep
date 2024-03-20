import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState } from '../store';
import { setFlashcards, deleteFlashcard } from '../store';
import { Flashcard } from '../../shared/types';
import { AppBar, Button, Typography, Container, Box, Toolbar, List, ListItem, ListItemText } from '@mui/material';
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

const FlashcardList: React.FC = () => {
  const flashcards = useSelector((state: RootState) => state.flashcard.flashcards as Flashcard[]);
  const dispatch = useDispatch();

  useEffect(() => {
    fetch('/api/flashcards')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch flashcards');
        }
        return response.json();
      })
      .then(data => dispatch(setFlashcards(data)))
      .catch(error => {
        console.error('Error fetching flashcards:', error);
        // Display an error message to the user or handle the error state
      });
  }, [dispatch]);

  const handleDelete = (id: string) => {
    fetch(`/api/flashcards/${id}`, { method: 'DELETE' })
      .then(() => dispatch(deleteFlashcard(id)));
  };

  return (
    <ThemeProvider theme={customTheme}>
      <Box sx={{ backgroundColor: '#333', minHeight: '100vh' }}>
        <AppBar position="static">
          <Toolbar>
            <Button color="secondary" component={Link} to="/" variant="contained" sx={{ fontSize: '1.1rem', padding: '8px 10px' }}>
              Home
            </Button>
          </Toolbar>
        </AppBar>
        <Container maxWidth="sm" sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h4" component="h2" sx={{ mb: 4 }}>
            Flashcards
          </Typography>
          <Button variant="contained" color="secondary" component={Link} to="/flashcards/new" sx={{ mb: 4 }}>
            Create Flashcard
          </Button>
          <List>
            {flashcards.map(flashcard => (
              <ListItem key={flashcard.id}>
                <ListItemText primary={flashcard.front} secondary={flashcard.back} />
                <Button variant="outlined" color="secondary" component={Link} to={`/flashcards/${flashcard.id}/edit`} sx={{ mr: 2 }}>
                  Edit
                </Button>
                <Button variant="outlined" color="secondary" onClick={() => handleDelete(flashcard.id)}>
                  Delete
                </Button>
              </ListItem>
            ))}
          </List>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default FlashcardList;
