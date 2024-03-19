
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState } from '../store';
import { setDecks, deleteDeck } from '../store';
import { Deck } from '../../shared/types';
import { List, ListItem, ListItemText, Button } from '@mui/material';

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
    <div>
      <h2>Decks</h2>
      <Button variant="contained" component={Link} to="/decks/new">
        Create Deck
      </Button>
      <List>
        {decks.map(deck => (
          <ListItem key={deck.id}>
            <ListItemText primary={deck.name} secondary={deck.description} />
            <Button component={Link} to={`/decks/${deck.id}/edit`}>
              Edit
            </Button>
            <Button onClick={() => handleDelete(deck.id)}>Delete</Button>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default DeckList;

