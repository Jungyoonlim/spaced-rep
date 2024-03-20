import { Pool } from 'pg';
import { Flashcard, Deck, User } from '../shared/types';

export async function initializeDatabase() {
  const pool = new Pool({
    host: 'localhost',
    port: 5432,
    database: 'your_database_name',
    user: 'your_username',
    password: 'your_password',
  });

  return pool;
}

export async function getFlashcards(): Promise<Flashcard[]> {
  const db = await initializeDatabase();
  const result = await db.query<Flashcard[]>('SELECT * FROM flashcards');
  await db.end();
  return result.rows;
}

export async function getFlashcardById(id: string): Promise<Flashcard | undefined> {
  const db = await initializeDatabase();
  const result = await db.query<Flashcard>('SELECT * FROM flashcards WHERE id = $1', [id]);
  await db.end();
  return result.rows[0];
}

export async function createFlashcard(flashcard: Omit<Flashcard, 'id' | 'createdAt' | 'updatedAt'>): Promise<Flashcard> {
  const db = await initializeDatabase();
  const now = new Date().toISOString();
  const { front, back, deckId } = flashcard;
  const result = await db.query(
    'INSERT INTO flashcards (id, front, back, deckId, createdAt, updatedAt) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
    [crypto.randomUUID(), front, back, deckId, now, now]
  );
  await db.end();
  return result.rows[0];
}

export async function updateFlashcard(id: string, flashcard: Partial<Omit<Flashcard, 'id' | 'createdAt' | 'updatedAt'>>): Promise<Flashcard | undefined> {
  const db = await initializeDatabase();
  const now = new Date().toISOString();
  const { front, back, deckId } = flashcard;
  const result = await db.query(
    'UPDATE flashcards SET front = $1, back = $2, deckId = $3, updatedAt = $4 WHERE id = $5 RETURNING *',
    [front, back, deckId, now, id]
  );
  await db.end();
  return result.rows[0];
}

export async function deleteFlashcard(id: string, userId: string): Promise<boolean> {
  const db = await initializeDatabase();
  const result = await db.query('DELETE FROM flashcards WHERE id = $1 AND userId = $2', [id, userId]);
  await db.end();
  return result.rowCount > 0;
}

export async function getDecks(): Promise<Deck[]> {
  const db = await initializeDatabase();
  const result = await db.query<Deck[]>('SELECT * FROM decks');
  await db.end();
  return result.rows;
}

export async function getDeckById(id: string): Promise<Deck | undefined> {
  const db = await initializeDatabase();
  const result = await db.query<Deck>('SELECT * FROM decks WHERE id = $1', [id]);
  await db.end();
  return result.rows[0];
}

export async function createDeck(deck: Omit<Deck, 'id' | 'createdAt' | 'updatedAt'>): Promise<Deck> {
  const db = await initializeDatabase();
  const now = new Date().toISOString();
  const { name, description, userId } = deck;
  const result = await db.query(
    'INSERT INTO decks (id, name, description, userId, createdAt, updatedAt) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
    [crypto.randomUUID(), name, description, userId, now, now]
  );
  await db.end();
  return result.rows[0];
}

export async function updateDeck(id: string, deck: Partial<Omit<Deck, 'id' | 'createdAt' | 'updatedAt'>>): Promise<Deck | undefined> {
  const db = await initializeDatabase();
  const now = new Date().toISOString();
  const { name, description } = deck;
  const result = await db.query(
    'UPDATE decks SET name = $1, description = $2, updatedAt = $3 WHERE id = $4 RETURNING *',
    [name, description, now, id]
  );
  await db.end();
  return result.rows[0];
}

export async function deleteDeck(id: string, userId: string): Promise<boolean> {
  const db = await initializeDatabase();
  const result = await db.query('DELETE FROM decks WHERE id = $1 and userId = $2', [id, userId]);
  await db.end();
  return result.rowCount > 0;
}

export async function getUserById(id: string): Promise<User | undefined> {
  const db = await initializeDatabase();
  const result = await db.query<User>('SELECT * FROM users WHERE id = $1', [id]);
  await db.end();
  return result.rows[0];
}

export async function getUserByEmail(email: string): Promise<User | undefined> {
  const db = await initializeDatabase();
  const result = await db.query<User>('SELECT * FROM users WHERE email = $1', [email]);
  await db.end();
  return result.rows[0];
}

export async function createUser(user: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<User> {
  const db = await initializeDatabase();
  const now = new Date().toISOString();
  const { email, password, name } = user;
  const result = await db.query(
    'INSERT INTO users (id, email, password, name, createdAt, updatedAt) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
    [crypto.randomUUID(), email, password, name, now, now]
  );
  await db.end();
  return result.rows[0];
}

export async function getFlashcardsByUserId(userId: string): Promise<Flashcard[]> {
  const db = await initializeDatabase();
  const result = await db.query<Flashcard[]>('SELECT * FROM flashcards WHERE userId = $1', [userId]);
  await db.end();
  return result.rows;
}

export async function getDeckByUserId(userId: string): Promise<Deck[]> {
  const db = await initializeDatabase();
  const result = await db.query<Deck[]>('SELECT * FROM decks WHERE userId = $1', [userId]);
  await db.end();
  return result.rows;
}