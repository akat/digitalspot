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
   - Tiny CRM: <http://localhost:8000/app>
   - MinIO console: <http://localhost:9001>

The seed command creates an administrator account and the Greek homepage with example agency content. The login email and password come from `PAYLOAD_ADMIN_EMAIL` and `PAYLOAD_ADMIN_PASSWORD` in `.env`.
The CRM container builds the pinned Tiny CRM source revision, runs its migrations, and creates the CRM administrator from `CRM_ADMIN_EMAIL` and `CRM_ADMIN_PASSWORD`. Set a unique `CRM_API_TOKEN` in `.env`; website leads are posted through the Nuxt server to the CRM's token-protected API and are never sent directly from the browser to the CRM.

The contact slice includes a lead form for name, email, phone, company, requested service, and message. Submissions create a CRM account/contact and a web-sourced lead categorized by the selected service. The CRM is published only on localhost at the port configured by `CRM_PORT`.

Stop the containers without removing saved content:

```bash
docker compose down
```

MongoDB records and uploaded media persist in Docker volumes.

## Portainer deployment

The production stack is in [portainer-stack.yml](./portainer-stack.yml). Configure these DNS records to point to the Traefik host:

- `digitalspot.gr` and `www.digitalspot.gr` — Nuxt site; the apex redirects to `www`.
- `payload.digitalspot.gr` — Payload CMS.
- `crm.digitalspot.gr` — Tiny CRM.
- `media.digitalspot.gr` — public media endpoint used by Payload.
- `storage.digitalspot.gr` — MinIO Console.

The GitHub Actions workflow at `.github/workflows/publish-images.yml` builds the frontend, CMS, and CRM images and publishes them to GHCR when code is pushed to the default branch or a version tag is created. Pull requests build the images without publishing them. Image names follow `ghcr.io/<owner>/<repository>/{frontend,cms,crm}`; use the matching prefix for `GHCR_IMAGE_PREFIX` in Portainer. Set the packages to public in GitHub, or configure GHCR registry credentials in Portainer if they are private.

In Portainer, deploy `portainer-stack.yml` as a Stack and enter the values from `portainer.env.example` under **Environment variables**. Replace all blank values with unique production secrets; do not commit the filled values. The stack expects an existing external Docker network named `proxy`, with Traefik entrypoint `websecure` and certificate resolver `le`. Create that network and configure those names in Traefik before deploying. It does not publish database or application ports directly.

The first deployment creates the MinIO bucket and enables anonymous read access for files in that bucket, which is required for public website media. The CRM admin is created on first startup; the Payload admin is created through its first-user setup at `https://payload.digitalspot.gr/admin`. Preserve the named volumes when updating the stack so content, uploads, CRM data, and its generated application key remain available.

## Reusable page slices

In Payload, open **Σελίδες** to create or edit pages. The **Ενότητες σελίδας** block editor can be used on every page; sections may be added, removed, reordered, and populated independently:

- Κεντρικό μήνυμα
- Υπηρεσίες
- Αριθμοί και αποτελέσματα
- Χαρακτηριστικά
- Επίπεδα λύσης
- Κείμενο με εικόνα
- Λογότυπα συνεργατών
- Έργα
- Η διαδικασία μας
- Μαρτυρία πελάτη
- Συχνές ερωτήσεις
- Παρουσίαση έργου
- Πρόσκληση επικοινωνίας
- Στοιχεία επικοινωνίας

Κάθε slice διαθέτει επιλογή κίνησης εμφάνισης. Η ενότητα επικοινωνίας υποστηρίζει χάρτη μέσω προαιρετικού συνδέσμου ενσωμάτωσης. Οι σελίδες `/paradeigmata-slices` και `/project-paradeigma` περιέχουν έτοιμα παραδείγματα όλων των slices και εσωτερικής παρουσίασης portfolio αντίστοιχα.

The site header and footer are shared layout components. The seeded homepage uses the same reusable slices available to every new page. Replace the sample contact details and illustrative project cards with the agency’s real content before launch.

## Edit navigation and footer

In the Payload admin, edit **Κύριο μενού** and **Υποσέλιδο** as separate entries under **Globals**. The menu supports adding, removing, and reordering links, with nested child links and a configurable header button. The starter **Υπηρεσίες** item includes Εφαρμογές για κινητά, Ιστοσελίδες, Ηλεκτρονικά καταστήματα, and Εξατομικευμένες πλατφόρμες. The footer has its own fields for grouped links, social links, contact details, and copyright. Changes appear in the shared site header and footer on every page.

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
