import { format, parseISO, isValid } from 'date-fns';

/**
 * Format date in UK style (DD/MM/YYYY)
 */
export function formatDate(dateString: string): string {
  try {
    const date = parseISO(dateString);
    if (!isValid(date)) return 'Invalid date';
    
    return format(date, 'dd/MM/yyyy');
  } catch {
    return 'Invalid date';
  }
}

/**
 * Format date in long format (1st January 2024)
 */
export function formatDateLong(dateString: string): string {
  try {
    const date = parseISO(dateString);
    if (!isValid(date)) return 'Invalid date';
    
    return format(date, 'do MMMM yyyy');
  } catch {
    return 'Invalid date';
  }
}

/**
 * Format date for display in cards (Jan 2024)
 */
export function formatDateShort(dateString: string): string {
  try {
    const date = parseISO(dateString);
    if (!isValid(date)) return 'Invalid date';
    
    return format(date, 'MMM yyyy');
  } catch {
    return 'Invalid date';
  }
}

/**
 * Get relative time from now (e.g., "2 years ago")
 */
export function getRelativeTime(dateString: string): string {
  try {
    const date = parseISO(dateString);
    if (!isValid(date)) return 'Invalid date';
    
    const now = new Date();
    const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffInDays === 0) return 'Today';
    if (diffInDays === 1) return 'Yesterday';
    if (diffInDays < 30) return `${diffInDays} days ago`;
    if (diffInDays < 365) return `${Math.floor(diffInDays / 30)} months ago`;
    return `${Math.floor(diffInDays / 365)} years ago`;
  } catch {
    return 'Invalid date';
  }
}