// Lead service
// ...будет реализовано позже
import { insertLead } from '../db/queries';
import { Lead } from '../types';

export async function saveLead(lead: Omit<Lead, 'id' | 'created_at'>): Promise<Lead> {
	return insertLead(lead);
}
