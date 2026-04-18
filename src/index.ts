// Entry point
import './bot';
import './server';

import { Client } from "pg";
import { initDB } from "./db/init";

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

async function start() {
  await client.connect();

  await initDB(client); // ← создаёт таблицы

  console.log("DB ready");
}

start();