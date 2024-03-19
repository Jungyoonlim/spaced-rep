
import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from './store';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';

const App: React.FC = () => {
  const user = useSelector((state: RootState) => state.user.user);

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Spaced Repetition App
          </Typography>
          {user ? (
            <Button color="inherit" component={Link} to="/logout">
              Logout
            </Button>
          ) : (
            <>
              <Button color="inherit" component={Link} to="/login">
                Login
              </Button>
              <Button color="inherit" component={Link} to="/register">
                Register
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
      <nav>
        <ul>
          <li>
            <Link to="/flashcards">Flashcards</Link>
          </li>
          <li>
            <Link to="/decks">Decks</Link>
          </li>
        </ul>
      </nav>
      <main>
        <h1>Welcome to the Spaced Repetition App!</h1>
        <p>Start learning and improving your memory retention today.</p>
      </main>
    </div>
  );
};

export default App;

