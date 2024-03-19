
import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Flashcard, Deck, User } from '../shared/types';

interface FlashcardState {
  flashcards: Flashcard[];
  currentFlashcard: Flashcard | null;
}

const flashcardSlice = createSlice({
  name: 'flashcard',
  initialState: { flashcards: [], currentFlashcard: null } as FlashcardState,
  reducers: {
    setFlashcards: (state, action: PayloadAction<Flashcard[]>) => {
      state.flashcards = action.payload;
    },
    addFlashcard: (state, action: PayloadAction<Flashcard>) => {
      state.flashcards.push(action.payload);
    },
    updateFlashcard: (state, action: PayloadAction<Flashcard>) => {
      const index = state.flashcards.findIndex(f => f.id === action.payload.id);
      if (index !== -1) {
        state.flashcards[index] = action.payload;
      }
    },
    deleteFlashcard: (state, action: PayloadAction<string>) => {
      state.flashcards = state.flashcards.filter(f => f.id !== action.payload);
    },
    setCurrentFlashcard: (state, action: PayloadAction<Flashcard | null>) => {
      state.currentFlashcard = action.payload;
    },
  },
});

interface DeckState {
  decks: Deck[];
  currentDeck: Deck | null;
}

const deckSlice = createSlice({
  name: 'deck',
  initialState: { decks: [], currentDeck: null } as DeckState,
  reducers: {
    setDecks: (state, action: PayloadAction<Deck[]>) => {
      state.decks = action.payload;
    },
    addDeck: (state, action: PayloadAction<Deck>) => {
      state.decks.push(action.payload);
    },
    updateDeck: (state, action: PayloadAction<Deck>) => {
      const index = state.decks.findIndex(d => d.id === action.payload.id);
      if (index !== -1) {
        state.decks[index] = action.payload;
      }
    },
    deleteDeck: (state, action: PayloadAction<string>) => {
      state.decks = state.decks.filter(d => d.id !== action.payload);
    },
    setCurrentDeck: (state, action: PayloadAction<Deck | null>) => {
      state.currentDeck = action.payload;
    },
  },
});

interface UserState {
  user: User | null;
}

const userSlice = createSlice({
  name: 'user',
  initialState: { user: null } as UserState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
    },
  },
});

export const {
  setFlashcards,
  addFlashcard,
  updateFlashcard,
  deleteFlashcard,
  setCurrentFlashcard,
} = flashcardSlice.actions;

export const {
  setDecks,
  addDeck,
  updateDeck,
  deleteDeck,
  setCurrentDeck,
} = deckSlice.actions;

export const { setUser } = userSlice.actions;

export const rootReducer = {
  flashcard: flashcardSlice.reducer,
  deck: deckSlice.reducer,
  user: userSlice.reducer,
};

export type RootState = ReturnType<typeof rootReducer>;

