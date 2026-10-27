## Run with Docker

1. Copy `.env.example` to `.env` and set unique values for the Payload secret, admin password, and MinIO password.
2. Start the stack and seed the initial content:

   ```bash
   docker compose up --build -d
   docker compose exec cms npm run seed
   ```

