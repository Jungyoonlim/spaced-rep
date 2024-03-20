
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; 
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { RootState } from '../store';
import { addDeck, updateDeck, setCurrentDeck } from '../store';
import { Deck, CreateDeckDto, UpdateDeckDto } from '../../shared/types';
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

const DeckForm: React.FC = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const currentDeck = useSelector((state: RootState) => state.deck.currentDeck);
  const user = useSelector((state: RootState) => state.user.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (id) {
      fetch(`/api/decks/${id}`)
        .then(response => response.json())
        .then(data => {
          dispatch(setCurrentDeck(data));
          setName(data.name);
          setDescription(data.description);
        });
    }
  }, [id, dispatch]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentDeck) {
      const updatedDeck: UpdateDeckDto = {
        name: name || currentDeck.name,
        description: description || currentDeck.description,
      };
      fetch(`/api/decks/${currentDeck.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedDeck),
      })
        .then(response => response.json())
        .then(data => {
          dispatch(updateDeck(data));
          navigate('/decks');
        });
    } else {
      const newDeck: CreateDeckDto = { name, description, userId: user!.id };
      fetch('/api/decks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newDeck),
      })
        .then(response => response.json())
        .then(data => {
          dispatch(addDeck(data));
          navigate('/decks');
        });
    }
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
    <Toolbar>
    <form onSubmit={handleSubmit}>
    <Typography variant="h3" component="h2" gutterBottom>
         Create Deck
    </Typography>
    <TextField
      label="Name"
      value={name}
      onChange={e => setName(e.target.value)}
      required
    />
    <TextField
      label="Description"
      value={description}
      onChange={e => setDescription(e.target.value)}
    />
    <Button type="submit" variant="contained">
      {currentDeck ? 'Update' : 'Create'}
    </Button>
    </form>
    </Toolbar>
    </Container>
    </Box>
  </ThemeProvider>
  );
};

export default DeckForm;



