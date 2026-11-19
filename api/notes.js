// Vercel serverless function: /api/notes  (GET, POST, PUT?id=, DELETE?id=)
const { neon } = require('@neondatabase/serverless');

module.exports = async (req, res) => {
  try {
    if (!process.env.DATABASE_URL) {
      return res.status(500).json({ error: 'DATABASE_URL is missing. Connect a Postgres database in Vercel.' });
    }
    const sql = neon(process.env.DATABASE_URL);
    await sql`CREATE TABLE IF NOT EXISTS notes (
      id SERIAL PRIMARY KEY, title TEXT DEFAULT '', body TEXT DEFAULT '',
      color TEXT DEFAULT '#FFF3B0', pinned BOOLEAN DEFAULT false,
      status TEXT DEFAULT 'active', created_at TIMESTAMPTZ DEFAULT now())`;

    const id = req.query.id ? Number(req.query.id) : null;
    const b = req.body || {};

    if (req.method === 'GET') {
      const rows = await sql`SELECT * FROM notes ORDER BY pinned DESC, id DESC`;
      return res.status(200).json(rows);
    }
    if (req.method === 'POST') {
      const rows = await sql`INSERT INTO notes (title, body, color)
        VALUES (${b.title || ''}, ${b.body || ''}, ${b.color || '#FFF3B0'}) RETURNING *`;
      return res.status(201).json(rows[0]);
    }
    if (req.method === 'PUT' && id) {
      const rows = await sql`UPDATE notes SET
        title = COALESCE(${b.title ?? null}, title),
        body = COALESCE(${b.body ?? null}, body),
        color = COALESCE(${b.color ?? null}, color),
        pinned = COALESCE(${b.pinned ?? null}, pinned),
        status = COALESCE(${b.status ?? null}, status)
        WHERE id = ${id} RETURNING *`;
      return res.status(200).json(rows[0]);
    }
    if (req.method === 'DELETE' && id) {
      await sql`DELETE FROM notes WHERE id = ${id}`;
      return res.status(200).json({ ok: true });
    }
    return res.status(405).json({ error: 'Method not allowed' });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};
