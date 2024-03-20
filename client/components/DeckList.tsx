import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { setDecks, deleteDeck } from '../store';
import { Deck } from '../../shared/types';
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

const DeckList: React.FC = () => {
  const decks = useSelector((state: RootState) => state.deck.decks);
  const dispatch = useDispatch();

  useEffect(() => {
    fetch('/api/decks')
      .then(response => response.json())
      .then(data => dispatch(setDecks(data)));
  }, [dispatch]);

  const handleDelete = (id: string) => {
    fetch(`/api/decks/${id}`, { method: 'DELETE' })
      .then(() => dispatch(deleteDeck(id)));
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
            Decks
          </Typography>
          <Button variant="contained" color="secondary" component={Link} to="/decks/new" sx={{ mb: 4 }}>
            Create Deck
          </Button>
          <List>
            {decks.map(deck => (
              <ListItem key={deck.id}>
                <ListItemText primary={deck.name} />
                <Button variant="outlined" color="secondary" component={Link} to={`/decks/${deck.id}/edit`} sx={{ mr: 2 }}>
                  Edit
                </Button>
                <Button variant="outlined" color="secondary" onClick={() => handleDelete(deck.id)}>
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

export default DeckList;