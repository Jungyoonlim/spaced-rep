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

export async function deleteFlashcard(id: string, userId: string): Promise<boolean> {
  const db = await initializeDatabase();
  const result = await db.run('DELETE FROM flashcards WHERE id = ? AND userId = ?', userId);
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

export async function deleteDeck(id: string, userId: string): Promise<boolean> {
  const db = await initializeDatabase();
  const result = await db.run('DELETE FROM decks WHERE id = ? and userId = ?', id, userId);
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

export async function getFlashcardsByUserId(userId: string): Promise<Flashcard[]> {
  const db = await initializeDatabase();
  const flashcards = await db.all<Flashcard[]>('SELECT * FROM flashcards WHERE userId = ?', userId);
  await db.close();
  return flashcards;
}

export async function getDeckByUserId(userId: string): Promise<Deck[]> {
  const db = await initializeDatabase();
  const decks = await db.all<Deck[]>('SELECT * FROM decks WHERE userId = ?', userId);
  await db.close();
  return decks;
}