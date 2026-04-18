import { Client } from "pg";

export async function initDB(client: Client) {
  await client.query(`
    CREATE TABLE IF NOT EXISTS leads (
      id SERIAL PRIMARY KEY,
      telegram_id BIGINT NOT NULL,
      username TEXT,
      niche TEXT,
      goal TEXT,
      instagram TEXT,
      source TEXT,
      created_at TIMESTAMP DEFAULT NOW()
    );
  `);
}