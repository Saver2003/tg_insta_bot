// Получить последние N заявок
export async function getLeads(limit: number = 10): Promise<Lead[]> {
	const result = await pool.query(
		`SELECT * FROM leads ORDER BY created_at DESC LIMIT $1`,
		[limit]
	);
	return result.rows;
}
// SQL queries
// ...будет реализовано позже
import { pool } from './pool';
import { Lead } from '../types';

export async function insertLead(lead: Omit<Lead, 'id' | 'created_at'>): Promise<Lead> {
	const result = await pool.query(
		`INSERT INTO leads (telegram_id, username, niche, goal, instagram, source)
		 VALUES ($1, $2, $3, $4, $5, $6)
		 RETURNING *`,
		[lead.telegram_id, lead.username, lead.niche, lead.goal, lead.instagram, lead.source]
	);
	return result.rows[0];
}
