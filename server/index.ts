
import { app } from './run_express';
import { 
  getFlashcards, 
  getFlashcardById, 
  createFlashcard, 
  updateFlashcard, 
  deleteFlashcard,
  getDecks,
  getDeckById,
  createDeck,
  updateDeck,
  deleteDeck,
  getUserById,
  getUserByEmail,
  createUser,
} from './db';
import { 
  Flashcard, 
  CreateFlashcardDto, 
  UpdateFlashcardDto,
  Deck,
  CreateDeckDto,
  UpdateDeckDto,
  User,
  CreateUserDto,
  LoginUserDto,
  AIExplainDto,
  AISuggestDto,
} from '../shared/types';

// Flashcard routes
app.get('/api/flashcards', async (req, res) => {
  const flashcards = await getFlashcards();
  res.json(flashcards);
});

app.get('/api/flashcards/:id', async (req, res) => {
  const flashcard = await getFlashcardById(req.params.id);
  if (flashcard) {
    res.json(flashcard);
  } else {
    res.status(404).json({ message: 'Flashcard not found' });
  }
});

app.post('/api/flashcards', async (req, res) => {
  const flashcardData: CreateFlashcardDto = req.body;
  const flashcard = await createFlashcard(flashcardData);
  res.status(201).json(flashcard);
});

app.put('/api/flashcards/:id', async (req, res) => {
  const flashcardData: UpdateFlashcardDto = req.body;
  const flashcard = await updateFlashcard(req.params.id, flashcardData);
  if (flashcard) {
    res.json(flashcard);
  } else {
    res.status(404).json({ message: 'Flashcard not found' });
  }
});

app.delete('/api/flashcards/:id', async (req, res) => {
  const deleted = await deleteFlashcard(req.params.id);
  if (deleted) {
    res.sendStatus(204);
  } else {
    res.status(404).json({ message: 'Flashcard not found' });
  }
});

// Deck routes
app.get('/api/decks', async (req, res) => {
  const decks = await getDecks();
  res.json(decks);
});

app.get('/api/decks/:id', async (req, res) => {
  const deck = await getDeckById(req.params.id);
  if (deck) {
    res.json(deck);
  } else {
    res.status(404).json({ message: 'Deck not found' });
  }
});

app.post('/api/decks', async (req, res) => {
  const deckData: CreateDeckDto = req.body;
  const deck = await createDeck(deckData);
  res.status(201).json(deck);
});

app.put('/api/decks/:id', async (req, res) => {
  const deckData: UpdateDeckDto = req.body;
  const deck = await updateDeck(req.params.id, deckData);
  if (deck) {
    res.json(deck);
  } else {
    res.status(404).json({ message: 'Deck not found' });
  }
});

app.delete('/api/decks/:id', async (req, res) => {
  const deleted = await deleteDeck(req.params.id);
  if (deleted) {
    res.sendStatus(204);
  } else {
    res.status(404).json({ message: 'Deck not found' });
  }
});

// User routes
app.get('/api/users/:id', async (req, res) => {
  const user = await getUserById(req.params.id);
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

app.post('/api/users', async (req, res) => {
  const userData: CreateUserDto = req.body;
  const existingUser = await getUserByEmail(userData.email);
  if (existingUser) {
    res.status(409).json({ message: 'User already exists' });
  } else {
    const user = await createUser(userData);
    res.status(201).json(user);
  }
});

app.post('/api/login', async (req, res) => {
  const loginData: LoginUserDto = req.body;
  const user = await getUserByEmail(loginData.email);
  if (user && user.password === loginData.password) {
    res.json(user);
  } else {
    res.status(401).json({ message: 'Invalid email or password' });
  }
});

// AI routes
app.post('/api/ai/explain', async (req, res) => {
  const explainData: AIExplainDto = req.body;
  // TODO: Implement AI explanation logic
  res.json({ explanation: 'AI-generated explanation for the flashcard' });
});

app.post('/api/ai/suggest', async (req, res) => {
  const suggestData: AISuggestDto = req.body;
  // TODO: Implement AI suggestion logic
  res.json({ suggestions: ['Suggestion 1', 'Suggestion 2', 'Suggestion 3'] });
});

