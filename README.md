
# Spaced Repetition App with AI Assistance

This is a modern, intuitive, and user-friendly spaced repetition app using AI 

## Features

- Flashcard creation and management
- Spaced repetition algorithm for optimized memory retention
- AI-powered learning assistance with explanations and context
- Various study modes (flashcards, learn, write, spell, test, match)
- Personalized learning experience with adaptive recommendations
- Collaboration and sharing of flashcard decks
- Impeccable UI/UX with a clean, modern, and intuitive design
- Efficient and responsive app performance

## Technologies Used

- Front-end: React, Redux, Material-UI
- Back-end: Node.js, Express.js, TypeScript
- Database: SQLite (sqlite3 library)
- AI Integration: Hugging Face Transformers

## Getting Started

To run the app locally, follow these steps:

1. Clone the repository:
   ```
   git clone https://github.com/your-username/spaced-repetition-app.git
   ```

2. Install dependencies:
   ```
   cd spaced-repetition-app
   npm install
   ```

3. Start the development server:
   ```
   bun server/run.ts
   ```

4. Open your browser and visit `http://localhost:8001` to access the app.

## API Routes

- `GET /api/flashcards` - Retrieve all flashcards
- `POST /api/flashcards` - Create a new flashcard
- `GET /api/flashcards/:id` - Retrieve a specific flashcard by ID
- `PUT /api/flashcards/:id` - Update a specific flashcard by ID
- `DELETE /api/flashcards/:id` - Delete a specific flashcard by ID
- `GET /api/decks` - Retrieve all flashcard decks
- `POST /api/decks` - Create a new flashcard deck
- `GET /api/decks/:id` - Retrieve a specific flashcard deck by ID
- `PUT /api/decks/:id` - Update a specific flashcard deck by ID
- `DELETE /api/decks/:id` - Delete a specific flashcard deck by ID
- `POST /api/ai/explain` - Get AI-generated explanations for a flashcard
- `POST /api/ai/suggest` - Get AI-powered suggestions for additional learning resources

## Database

The app uses SQLite as the database for storing flashcards and decks. The server creates the necessary tables and handles all database operations.

## Socket.io

Socket.io is not used in this app.

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, please open an issue or submit a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
