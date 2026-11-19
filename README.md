# NoteNest 🪺
A Google Keep clone. Frontend designed with Google Stitch, backend + database on Vercel (serverless function + Neon Postgres), built and connected in Antigravity.

## Features
Create, edit, pin, archive, trash, restore and permanently delete notes. Search. Pastel note colors. Responsive.

## Structure
- `public/index.html` - frontend (HTML, CSS, JS)
- `api/notes.js` - backend (Vercel serverless function)
- `schema.sql` - database table (auto-created by the API)

## Run locally
```
npm i -g vercel
npm install
vercel link
vercel env pull .env.local
vercel dev
```

## Deploy
1. Push to GitHub. 2. Import the repo on vercel.com and deploy.
3. In the Vercel project: Storage -> Create Database -> Neon (Postgres) -> connect to project (adds `DATABASE_URL`).
4. Redeploy. Open the URL.
