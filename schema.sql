-- Optional: the API creates this table automatically on first request.
CREATE TABLE IF NOT EXISTS notes (
  id SERIAL PRIMARY KEY,
  title TEXT DEFAULT '',
  body TEXT DEFAULT '',
  color TEXT DEFAULT '#FFF3B0',
  pinned BOOLEAN DEFAULT false,
  status TEXT DEFAULT 'active', -- active | archived | trash
  created_at TIMESTAMPTZ DEFAULT now()
);
