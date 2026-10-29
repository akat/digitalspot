## Run with Docker

1. Copy `.env.example` to `.env` and set unique values for the Payload secret, admin password, and MinIO password.
2. Start the stack and seed the initial content:

   ```bash
   docker compose up --build -d
   docker compose exec cms npm run seed
   ```

For the Portainer deployment, set `PAYLOAD_ADMIN_EMAIL` and `PAYLOAD_ADMIN_PASSWORD`. The `cms-seed` one-shot service creates the initial administrator, Greek homepage, navigation, footer, and example pages once Payload is healthy. The seed only runs on an empty database: once any user exists it exits without changes, so content edited in the admin is never overwritten.
