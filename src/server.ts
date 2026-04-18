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
	bot.handleUpdate(req.body, res);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
