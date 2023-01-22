
BEGIN;

CREATE TABLE IF NOT EXISTS tasks (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  content TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  complete INTEGER DEFAULT 0 CHECK(complete IN (0, 1))
);

COMMIT;

/* using a sql 'transaction'
every statement after BEGIN will be attempted, then assuming no errors, the COMMIT statement will persist all changes. 
if anything in transaction fails, everything is reverted - preventing your db from getting into a broken state