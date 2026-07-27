import { v4 as uuidv4 } from 'uuid';

export function generateSessionId(): string {
  // Simple unique ID generator (or use uuid package)
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}