import Database from 'better-sqlite3';
import { Flashcard, Deck, User } from '../shared/types';

export async function initializeDatabase() {
  const db = new Database('./database.sqlite');

  db.exec(`
    CREATE TABLE IF NOT EXISTS flashcards (
      id TEXT PRIMARY KEY,
      front TEXT NOT NULL,
      back TEXT NOT NULL,
      deckId TEXT NOT NULL,
      createdAt TEXT NOT NULL,
      updatedAt TEXT NOT NULL,
      FOREIGN KEY (deckId) REFERENCES decks (id)
    );

    CREATE TABLE IF NOT EXISTS decks (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      description TEXT,
      userId TEXT NOT NULL,
      createdAt TEXT NOT NULL,
      updatedAt TEXT NOT NULL,
      FOREIGN KEY (userId) REFERENCES users (id)
    );

    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL,
      name TEXT NOT NULL,
      createdAt TEXT NOT NULL,
      updatedAt TEXT NOT NULL
    );
  `);

  return db;
}

export async function getFlashcards(): Promise<Flashcard[]> {
  const db = await initializeDatabase();
  const flashcards = await db.all<Flashcard[]>('SELECT * FROM flashcards');
  await db.close();
  return flashcards;
}

export async function getFlashcardById(id: string): Promise<Flashcard | undefined> {
  const db = await initializeDatabase();
  const flashcard = await db.get<Flashcard>('SELECT * FROM flashcards WHERE id = ?', id);
  await db.close();
  return flashcard;
}

export async function createFlashcard(flashcard: Omit<Flashcard, 'id' | 'createdAt' | 'updatedAt'>): Promise<Flashcard> {
  const db = await initializeDatabase();
  const now = new Date().toISOString();
  const { front, back, deckId } = flashcard;
  const result = await db.run(
    'INSERT INTO flashcards (id, front, back, deckId, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?)',
    [crypto.randomUUID(), front, back, deckId, now, now]
  );
  const createdFlashcard = await getFlashcardById(result.lastID!);
  await db.close();
  return createdFlashcard!;
}

export async function updateFlashcard(id: string, flashcard: Partial<Omit<Flashcard, 'id' | 'createdAt' | 'updatedAt'>>): Promise<Flashcard | undefined> {
  const db = await initializeDatabase();
  const now = new Date().toISOString();
  const { front, back, deckId } = flashcard;
  await db.run(
    'UPDATE flashcards SET front = ?, back = ?, deckId = ?, updatedAt = ? WHERE id = ?',
    [front, back, deckId, now, id]
  );
  const updatedFlashcard = await getFlashcardById(id);
  await db.close();
  return updatedFlashcard;
}

export async function deleteFlashcard(id: string): Promise<boolean> {
  const db = await initializeDatabase();
  const result = await db.run('DELETE FROM flashcards WHERE id = ?', id);
  await db.close();
  return result.changes > 0;
}

export async function getDecks(): Promise<Deck[]> {
  const db = await initializeDatabase();
  const decks = await db.all<Deck[]>('SELECT * FROM decks');
  await db.close();
  return decks;
}

export async function getDeckById(id: string): Promise<Deck | undefined> {
  const db = await initializeDatabase();
  const deck = await db.get<Deck>('SELECT * FROM decks WHERE id = ?', id);
  await db.close();
  return deck;
}

export async function createDeck(deck: Omit<Deck, 'id' | 'createdAt' | 'updatedAt'>): Promise<Deck> {
  const db = await initializeDatabase();
  const now = new Date().toISOString();
  const { name, description, userId } = deck;
  const result = await db.run(
    'INSERT INTO decks (id, name, description, userId, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?)',
    [crypto.randomUUID(), name, description, userId, now, now]
  );
  const createdDeck = await getDeckById(result.lastID!);
  await db.close();
  return createdDeck!;
}

export async function updateDeck(id: string, deck: Partial<Omit<Deck, 'id' | 'createdAt' | 'updatedAt'>>): Promise<Deck | undefined> {
  const db = await initializeDatabase();
  const now = new Date().toISOString();
  const { name, description } = deck;
  await db.run(
    'UPDATE decks SET name = ?, description = ?, updatedAt = ? WHERE id = ?',
    [name, description, now, id]
  );
  const updatedDeck = await getDeckById(id);
  await db.close();
  return updatedDeck;
}

export async function deleteDeck(id: string): Promise<boolean> {
  const db = await initializeDatabase();
  const result = await db.run('DELETE FROM decks WHERE id = ?', id);
  await db.close();
  return result.changes > 0;
}

export async function getUserById(id: string): Promise<User | undefined> {
  const db = await initializeDatabase();
  const user = await db.get<User>('SELECT * FROM users WHERE id = ?', id);
  await db.close();
  return user;
}

export async function getUserByEmail(email: string): Promise<User | undefined> {
  const db = await initializeDatabase();
  const user = await db.get<User>('SELECT * FROM users WHERE email = ?', email);
  await db.close();
  return user;
}

export async function createUser(user: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<User> {
  const db = await initializeDatabase();
  const now = new Date().toISOString();
  const { email, password, name } = user;
  const result = await db.run(
    'INSERT INTO users (id, email, password, name, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?)',
    [crypto.randomUUID(), email, password, name, now, now]
  );
  const createdUser = await getUserById(result.lastID!);
  await db.close();
  return createdUser!;
}

