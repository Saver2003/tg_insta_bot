// Project types
// ...будет реализовано позже
export interface Lead {
	id?: number;
	telegram_id: number;
	username: string;
	niche: string;
	goal: string;
	instagram: string;
	source: string;
	created_at?: string;
}
