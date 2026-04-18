import { Telegraf } from 'telegraf';
import dotenv from 'dotenv';

dotenv.config();

const bot = new Telegraf(process.env.BOT_TOKEN!);

bot.start((ctx) => {
	ctx.reply('Привет! Я минималистичный Telegram-бот.');
});

// Ответ на текстовое сообщение 'hi'
// bot.hears(/^hi$/i, (ctx) => {
//   ctx.reply('привет');
// });

// Экспортируем для использования в других частях приложения
export default bot;
