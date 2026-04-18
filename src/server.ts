import express from 'express';
import dotenv from 'dotenv';
import bot from './bot';

dotenv.config();

const app = express();
app.use(express.json());

// Health check endpoint
app.get('/health', (_req, res) => {
	res.status(200).send('OK');
});

// Webhook endpoint
app.post('/webhook', async (req, res) => {
	try {
		const update = req.body;
		// Проверяем, что это текстовое сообщение "hi"
		if (
			update.message &&
			typeof update.message.text === 'string' &&
			update.message.text.trim().toLowerCase() === 'hi'
		) {
			await bot.telegram.sendMessage(update.message.chat.id, 'привет');
		}
		await bot.handleUpdate(update);
		res.sendStatus(200);
	} catch (e) {
		console.error(e);
		res.sendStatus(500);
	}
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
