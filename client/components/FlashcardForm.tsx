
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { RootState } from '../store';
import { addFlashcard, updateFlashcard, setCurrentFlashcard } from '../store';
import { Flashcard, CreateFlashcardDto, UpdateFlashcardDto } from '../../shared/types';
import { TextField, Button } from '@mui/material';

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
        .then(response => response.json())
        .then(data => {
          dispatch(addFlashcard(data));
          navigate('/flashcards');
        });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{currentFlashcard ? 'Edit Flashcard' : 'Create Flashcard'}</h2>
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
  );
};

export default FlashcardForm;

