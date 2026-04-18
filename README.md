# insta_bot

Минималистичный Telegram-бот для сбора лидов из Instagram

## О проекте

Этот проект — Telegram-бот, который:
- принимает пользователей из Instagram (через кодовое слово)
- проводит прогрев (message flow)
- собирает заявки (лиды)
- сохраняет данные в PostgreSQL

**Технологии:**
- Node.js + TypeScript
- Telegraf (Telegram Bot API)
- Express (webhook)
- PostgreSQL (pg)
- dotenv (конфигурация)
- nodemon (dev запуск)

## Структура проекта

```
/src
  index.ts              # entry point
  bot.ts                # инициализация telegraf
  server.ts             # express server + webhook
  db/
    pool.ts             # подключение к postgres
    queries.ts          # SQL запросы
  flows/
    entry.flow.ts       # вход через кодовое слово
    lead.flow.ts        # сбор заявки
  services/
    user.service.ts     # работа с пользователями
    lead.service.ts     # работа с лидами
  types/
    index.ts            # типы проекта
```

## Быстрый старт

1. Установите зависимости:
   ```bash
   npm install
   ```
2. Создайте файл `.env` и заполните переменные:
   ```env
   BOT_TOKEN=telegram_bot_token
   DATABASE_URL=postgres_connection_string
   PORT=3000
   WEBHOOK_URL=https://your-domain.com
   ```
3. Запустите в dev-режиме:
   ```bash
   npm run start
   ```

## Основная логика

1. Пользователь пишет кодовое слово (из Instagram)
2. Бот приветствует и прогревает пользователя
3. Собирает данные (ниша, цель, Instagram)
4. Сохраняет заявку в базу данных

## Таблица leads (PostgreSQL)

```sql
CREATE TABLE leads (
  id SERIAL PRIMARY KEY,
  telegram_id BIGINT NOT NULL,
  username TEXT,
  niche TEXT,
  goal TEXT,
  instagram TEXT,
  source TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);
```

## Принципы
- Минимализм и простота
- Только явные SQL-запросы (без ORM)
- Чистый TypeScript, функциональный стиль

## Лицензия
MIT
