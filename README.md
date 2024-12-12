# Application README

## Overview
This application is a banking system built using **Event Sourcing** and **CQRS (Command Query Responsibility Segregation)** patterns. It handles deposits, withdrawals, and account statements.

### Event Sourcing
- **Event Sourcing** ensures that all changes to the application's state are stored as a sequence of immutable events.
- Each user action (e.g., deposit, withdrawal) creates an event that is stored in the event store. This allows complete reconstruction of the application's state by replaying the events.
- In the future, **projections** can be added to facilitate complex queries (e.g., aggregating account balances).

### CQRS
- **CQRS** separates the write model (commands) and the read model (queries).
- **Commands** handle the business logic (e.g., creating events for deposits and withdrawals).
- **Queries** provide efficient data retrieval without interfering with the write logic.

---

## Folder Structure

```
/src
  /app                # Next.js frontend application
    /api              # API routes
    /deposit          # UI for deposits
    /withdraw         # UI for withdrawals
    /statement        # UI for account statements
  /components         # Reusable React components
  /hooks              # React hooks for API interaction
  /lib                # Utility types
  /prisma             # Database schema and seed scripts
  /server             # Backend logic for CQRS and Event Sourcing
    /application      # Command and query handlers
    /domain           # Domain models and events
    /infrastructure   # Database and event storage logic
/tests                # Unit and integration tests
```

### Key Directories
- **`/server/application`**: Implements the CQRS logic with command and query handlers.
- **`/server/domain`**: Defines the domain entities and events (e.g., DepositEvent, WithdrawEvent).
- **`/server/infrastructure`**: Contains repositories and data storage logic using Prisma.
- **`/prisma`**: Database schema definition and seed script.
- **`/app`**: Frontend logic implemented using Next.js.

---

## Starting the Application Locally

### Prerequisites
1. **Node.js** and **npm/yarn** installed.
2. **Docker** installed to run the PostgreSQL database.

### Steps
1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd <repository-name>
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   - Copy the `.env.example` file to `.env`:
     ```bash
     cp .env.example .env
     ```
   - Update the `.env` file with your configuration (e.g., database URL).

4. **Start the PostgreSQL database:**
   ```bash
   docker-compose up -d
   ```

5. **Run database migrations:**
   ```bash
   npx prisma migrate dev
   ```

6. **Seed the database (optional):**
   ```bash
   npx prisma db seed
   ```

7. **Start the development server:**
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:3000`.

8. **Run tests (optional):**
   ```bash
   npm run test
   ```

---

## Future Enhancements
- **Projections:** Create read-optimized views (e.g., aggregated balances) from events.
- **Pagination:** Improve the performance of large account statements.
- **GraphQL Support:** Provide an additional API layer for flexibility.

---

## Contributing
Feel free to open issues or submit pull requests to improve the application.

