
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState } from '../store';
import { setFlashcards, deleteFlashcard } from '../store';
import { Flashcard } from '../../shared/types';
import { List, ListItem, ListItemText, Button } from '@mui/material';

const FlashcardList: React.FC = () => {
  const flashcards = useSelector((state: RootState) => state.flashcard.flashcards as Flashcard[]);
  const dispatch = useDispatch();

  useEffect(() => {
    fetch('/api/flashcards')
      .then(response => response.json())
      .then(data => dispatch(setFlashcards(data)));
  }, [dispatch]);

  const handleDelete = (id: string) => {
    fetch(`/api/flashcards/${id}`, { method: 'DELETE' })
      .then(() => dispatch(deleteFlashcard(id)));
  };

  return (
    <div>
      <h2>Flashcards</h2>
      <Button variant="contained" component={Link} to="/flashcards/new">
        Create Flashcard
      </Button>
      <List>
        {flashcards.map(flashcard => (
          <ListItem key={flashcard.id}>
            <ListItemText primary={flashcard.front} secondary={flashcard.back} />
            <Button component={Link} to={`/flashcards/${flashcard.id}/edit`}>
              Edit
            </Button>
            <Button onClick={() => handleDelete(flashcard.id)}>Delete</Button>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default FlashcardList;

