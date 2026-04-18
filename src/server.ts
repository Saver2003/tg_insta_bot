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
app.post('/webhook', (req, res) => {
	bot.handleUpdate(req.body)
		.then(() => res.sendStatus(200))
		.catch((e) => {
			console.error(e);
			res.sendStatus(500);
		});
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
