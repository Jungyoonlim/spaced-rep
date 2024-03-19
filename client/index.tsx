import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { rootReducer } from './store';
import App from './App';
import FlashcardList from './components/FlashcardList';
import FlashcardForm from './components/FlashcardForm';
import DeckList from './components/DeckList';
import DeckForm from './components/DeckForm';
import Login from './components/Login';
import Register from './components/Register';
import './index.css';

const store = configureStore({
  reducer: rootReducer,
});

const theme = createTheme();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/flashcards" element={<FlashcardList />} />
            <Route path="/flashcards/new" element={<FlashcardForm />} />
            <Route path="/flashcards/:id/edit" element={<FlashcardForm />} />
            <Route path="/decks" element={<DeckList />} />
            <Route path="/decks/new" element={<DeckForm />} />
            <Route path="/decks/:id/edit" element={<DeckForm />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);