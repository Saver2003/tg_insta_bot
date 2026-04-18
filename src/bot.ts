import { Telegraf, Scenes, session, Context as TelegrafContext } from 'telegraf';
import dotenv from 'dotenv';

dotenv.config();

import leadWizard from './flows/lead.flow';

type LeadWizardContext = Scenes.WizardContext;

const bot = new Telegraf<LeadWizardContext>(process.env.BOT_TOKEN!);
const stage = new Scenes.Stage<LeadWizardContext>([leadWizard]);
bot.use(session());
bot.use(stage.middleware());

bot.start((ctx: LeadWizardContext) => {
	ctx.reply('Привет 👋 Я показываю, как бизнесы получают заявки из Instagram через чат-ботов. Без сайта. Без менеджера. Автоматически.');
	setTimeout(() => {
		ctx.reply('Сейчас большинство блогов теряют клиентов:\n\n— отвечают вручную\n— не успевают реагировать\n— теряют заявки ночью');
		setTimeout(() => {
			ctx.reply('Чат-бот решает это:\n\n✔ отвечает мгновенно\n✔ прогревает клиента\n✔ собирает заявку\n✔ отправляет тебе в базу');
			setTimeout(() => {
				ctx.reply('Примеры сценариев:\n\n• салон красоты → +38% записей\n• эксперт → заявки без сторис\n• магазин → автоматизация заказов');
				setTimeout(() => {
					ctx.reply('Хочешь такой бот под свой Instagram?\n\nЯ собираю такие системы под ключ.', {
						reply_markup: {
							keyboard: [["👉 Оставить заявку"]],
							resize_keyboard: true,
							one_time_keyboard: true
						}
					});
				}, 3000);
			}, 3000);
		}, 3000);
	}, 3000);
});


// Кнопка "Оставить заявку" запускает lead flow
bot.hears('👉 Оставить заявку', (ctx: LeadWizardContext) => ctx.scene.enter('lead-wizard'));

// Экспортируем для использования в других частях приложения
export default bot;
