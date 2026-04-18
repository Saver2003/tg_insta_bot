import { Telegraf, Scenes, session, Context as TelegrafContext } from 'telegraf';
import dotenv from 'dotenv';

dotenv.config();

import leadWizard from './flows/lead.flow';
import { fetchLeads } from './services/lead.service';

type LeadWizardContext = Scenes.WizardContext;

const bot = new Telegraf<LeadWizardContext>(process.env.BOT_TOKEN!);
const stage = new Scenes.Stage<LeadWizardContext>([leadWizard]);
bot.use(session());
bot.use(stage.middleware());


const ADMIN_ID = Number(process.env.ADMIN_ID);

bot.start((ctx: LeadWizardContext) => {
       const isAdmin = ctx.from?.id === ADMIN_ID;
       const keyboard = isAdmin
	       ? [["👉 Оставить заявку"], ["Посмотреть заявки"]]
	       : [["👉 Оставить заявку"]];

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
						       keyboard,
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

// Кнопка "Посмотреть заявки" только для ADMIN_ID
bot.hears('Посмотреть заявки', async (ctx: LeadWizardContext) => {
       if (ctx.from?.id !== ADMIN_ID) return;
       const leads = await fetchLeads(10);
       if (!leads.length) {
	       await ctx.reply('Заявок пока нет.');
	       return;
       }
       let msg = 'Последние заявки:\n';
       for (const lead of leads) {
	       msg += `\nID: ${lead.id}\nИмя: ${lead.username}\nНиша: ${lead.niche}\nЦель: ${lead.goal}\nInstagram: ${lead.instagram}\nИсточник: ${lead.source}\nСоздано: ${lead.created_at}\n---`;
       }
       await ctx.reply(msg);
});

// Экспортируем для использования в других частях приложения
export default bot;
