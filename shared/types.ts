
export interface Flashcard {
  id: string;
  front: string;
  back: string;
  deckId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Deck {
  id: string;
  name: string;
  description: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface User {
  id: string;
  email: string;
  password: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateFlashcardDto {
  front: string;
  back: string;
  deckId: string;
}

export interface UpdateFlashcardDto {
  front?: string;
  back?: string;
  deckId?: string;
}

export interface CreateDeckDto {
  name: string;
  description: string;
  userId: string;
}

export interface UpdateDeckDto {
  name?: string;
  description?: string;
}

export interface CreateUserDto {
  email: string;
  password: string;
  name: string;
}

export interface LoginUserDto {
  email: string;
  password: string;
}

export interface AIExplainDto {
  flashcardId: string;
}

export interface AISuggestDto {
  flashcardId: string;
}

