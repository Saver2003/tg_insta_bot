import { Telegraf } from 'telegraf';
import dotenv from 'dotenv';

dotenv.config();

const bot = new Telegraf(process.env.BOT_TOKEN!);

bot.start((ctx) => {
	ctx.reply('Привет 👋 Я показываю, как бизнесы получают заявки из Instagram через чат-ботов. Без сайта. Без менеджера. Автоматически.');
	setTimeout(() => {
		ctx.reply('Сейчас большинство блогов теряют клиентов:\n\n— отвечают вручную\n— не успевают реагировать\n— теряют заявки ночью');
		setTimeout(() => {
			ctx.reply('Чат-бот решает это:\n\n✔ отвечает мгновенно\n✔ прогревает клиента\n✔ собирает заявку\n✔ отправляет тебе в базу');
		}, 3000);
	}, 3000);
    
});

// Ответ на текстовое сообщение 'hi'
// bot.hears(/^hi$/i, (ctx) => {
//   ctx.reply('привет');
// });

// Экспортируем для использования в других частях приложения
export default bot;
