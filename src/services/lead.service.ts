import { getLeads } from '../db/queries';

export async function fetchLeads(limit: number = 10) {
	return getLeads(limit);
}
// Lead service
// ...будет реализовано позже
import { insertLead } from '../db/queries';
import { Lead } from '../types';

export async function saveLead(lead: Omit<Lead, 'id' | 'created_at'>): Promise<Lead> {
	return insertLead(lead);
}
