// Lead flow (сбор заявки)
// ...будет реализовано позже
import { Scenes, Markup } from 'telegraf';
import { saveLead } from '../services/lead.service';
import { Lead } from '../types';

type LeadWizardContext = Scenes.WizardContext & {
	session: Scenes.WizardSession & Partial<Lead>;
};

const leadWizard = new Scenes.WizardScene<LeadWizardContext>(
	'lead-wizard',
	async (ctx) => {
		ctx.session.username = undefined;
		ctx.session.niche = undefined;
		ctx.session.goal = undefined;
		ctx.session.instagram = undefined;
		ctx.session.source = undefined;
		await ctx.reply('Как вас зовут? (username)');
		return ctx.wizard.next();
	},
	async (ctx) => {
		if (ctx.message && 'text' in ctx.message) ctx.session.username = ctx.message.text;
		await ctx.reply('Ваша ниша?');
		return ctx.wizard.next();
	},
	async (ctx) => {
		if (ctx.message && 'text' in ctx.message) ctx.session.niche = ctx.message.text;
		await ctx.reply('Ваша главная цель?');
		return ctx.wizard.next();
	},
	async (ctx) => {
		if (ctx.message && 'text' in ctx.message) ctx.session.goal = ctx.message.text;
		await ctx.reply('Ваш Instagram (или контакт)?');
		return ctx.wizard.next();
	},
	async (ctx) => {
		if (ctx.message && 'text' in ctx.message) ctx.session.instagram = ctx.message.text;
		await ctx.reply('Откуда вы узнали о боте? (source)');
		return ctx.wizard.next();
	},
	async (ctx) => {
		if (ctx.message && 'text' in ctx.message) ctx.session.source = ctx.message.text;
		const lead: Omit<Lead, 'id' | 'created_at'> = {
			telegram_id: ctx.from?.id || 0,
			username: ctx.session.username || '',
			niche: ctx.session.niche || '',
			goal: ctx.session.goal || '',
			instagram: ctx.session.instagram || '',
			source: ctx.session.source || '',
		};
		const saved = await saveLead(lead);
		       await ctx.reply(
			       'Спасибо! Ваша заявка отправлена. Мы свяжемся с вами в ближайшее время.',
			       Markup.removeKeyboard()
		       );
		return ctx.scene.leave();
	}
);

export default leadWizard;
