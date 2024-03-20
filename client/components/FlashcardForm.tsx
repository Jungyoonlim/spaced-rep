import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; 
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { RootState } from '../store';
import { addFlashcard, updateFlashcard, setCurrentFlashcard } from '../store';
import { Flashcard, CreateFlashcardDto, UpdateFlashcardDto } from '../../shared/types';
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

const FlashcardForm: React.FC = () => {
  const [front, setFront] = useState('');
  const [back, setBack] = useState('');
  const currentFlashcard = useSelector((state: RootState) => state.flashcard.currentFlashcard);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (id) {
      fetch(`/api/flashcards/${id}`)
        .then(response => response.json())
        .then(data => {
          dispatch(setCurrentFlashcard(data));
          setFront(data.front);
          setBack(data.back);
        });
    }
  }, [id, dispatch]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();``
    if (currentFlashcard) {
      const updatedFlashcard: UpdateFlashcardDto = {
        front: front || currentFlashcard.front,
        back: back || currentFlashcard.back,
      };
      fetch(`/api/flashcards/${currentFlashcard.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedFlashcard),
      })
        .then(response => response.json())
        .then(data => {
          dispatch(updateFlashcard(data));
          navigate('/flashcards');
        });
    } else {
      const newFlashcard: CreateFlashcardDto = { front, back, deckId: '' };
      fetch('/api/flashcards', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newFlashcard),
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Failed to create flashcard');
          }
          return response.json();
        })
        .then(data => {
          dispatch(addFlashcard(data));
          navigate('/flashcards');
        })
        .catch(error => {
          console.error('Error creating flashcard:', error);
          // Display an error message to the user or handle the error state
        });
    }
  };

  return (
    <ThemeProvider theme={customTheme}>
      <Box sx={{ backgroundColor: '#333', minHeight: '100vh', backgroundImage: 'linear-gradient(to bottom right, #444, #222)', display: 'flex', flexDirection: 'column' }}>
      <AppBar position="static" sx={{ backgroundColor: 'transparent', boxShadow: 'none', borderRadius: '20px', mx: 'auto', my: 1 }}>
      <Toolbar>
    <Button color="secondary" component={Link} to="/" variant="contained" sx={{ fontSize: '1.1rem', padding: '8px 10px', marginRight: '16px' }}>
        Home
      </Button>
      <Button color="secondary" component={Link} to="/flashcards" variant="contained" sx={{ fontSize: '1.1rem', padding: '8px 10px' }}>
        Back
      </Button>
      </Toolbar>
    </AppBar>
    <Container maxWidth="sm" sx={{ textAlign: 'center', py: 8 }}>
    <Toolbar>
    <form onSubmit={handleSubmit}>
    <Typography variant="h3" component="h2" gutterBottom>
          Create Flashcard
        </Typography>
    <TextField
      label="Front"
      value={front}
      onChange={e => setFront(e.target.value)}
      required
    />
    <TextField
      label="Back"
      value={back}
      onChange={e => setBack(e.target.value)}
      required
    />
    <Button type="submit" variant="contained">
      {currentFlashcard ? 'Update' : 'Create'}
    </Button>
    </form>
    </Toolbar>
    </Container>
    </Box>
  </ThemeProvider>
  );
};

export default FlashcardForm;