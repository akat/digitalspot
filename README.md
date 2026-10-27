# Digital Spot — agency website

Greek-language digital agency website built with Nuxt and Payload CMS. The layout takes inspiration from Astroship's clean, conversion-focused startup style, with original copy, styling, and components.

The site has no e-shop or Odoo services. Its homepage and all other pages are assembled from reusable Payload slices.

## Run with Docker

1. Copy `.env.example` to `.env` and set unique values for the Payload secret, admin password, and MinIO password.
2. Start the stack and seed the initial content:

   ```bash
   docker compose up --build -d
   docker compose exec cms npm run seed
   ```

3. Visit:
   - Website: <http://localhost:3000>
   - Payload admin: <http://localhost:3055/admin>
   - MinIO console: <http://localhost:9001>

The seed command creates an administrator account and the Greek homepage with example agency content. The login email and password come from `PAYLOAD_ADMIN_EMAIL` and `PAYLOAD_ADMIN_PASSWORD` in `.env`.

Stop the containers without removing saved content:

```bash
docker compose down
```

MongoDB records and uploaded media persist in Docker volumes.

## Reusable page slices

In Payload, open **Σελίδες** to create or edit pages. The **Ενότητες σελίδας** block editor can be used on every page; sections may be added, removed, reordered, and populated independently:

- Κεντρικό μήνυμα
- Υπηρεσίες
- Αριθμοί και αποτελέσματα
- Έργα
- Η διαδικασία μας
- Συχνές ερωτήσεις
- Πρόσκληση επικοινωνίας
- Στοιχεία επικοινωνίας

The site header and footer are shared layout components. The seeded homepage uses the same reusable slices available to every new page. Replace the sample contact details and illustrative project cards with the agency’s real content before launch.

## Edit navigation and footer

In the Payload admin, open **Μενού και υποσέλιδο** under **Globals**. Add, remove, and reorder links in **Κύριο μενού**. Each menu item can also have its own **Υπομενού** links; the starter **Υπηρεσίες** item includes Εφαρμογές για κινητά, Ιστοσελίδες, Ηλεκτρονικά καταστήματα, and Εξατομικευμένες πλατφόρμες. Parent and child links can each be assigned their own destination. The same global lets you edit the header button, footer description, grouped footer link columns, social links, contact details, and copyright line. Changes appear in the shared site header and footer on every page.

## Local development

Run MongoDB and MinIO with Docker, then run each application in its own terminal:

```bash
cd cms
npm install
npm run dev
```

```bash
cd frontend
npm install
npm run dev
```

Configure the local CMS with `DATABASE_URI=mongodb://localhost:27017/digitalspot` and `PAYLOAD_SECRET`; set `NUXT_PAYLOAD_URL=http://localhost:3055` in the frontend environment.
