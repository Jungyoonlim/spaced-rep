
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { RootState } from '../store';
import { addDeck, updateDeck, setCurrentDeck } from '../store';
import { Deck, CreateDeckDto, UpdateDeckDto } from '../../shared/types';
import { TextField, Button } from '@mui/material';

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
    <form onSubmit={handleSubmit}>
      <h2>{currentDeck ? 'Edit Deck' : 'Create Deck'}</h2>
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
  );
};

export default DeckForm;

