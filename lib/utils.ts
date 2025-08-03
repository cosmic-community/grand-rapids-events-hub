import { clsx, type ClassValue } from 'clsx'
import { format, parseISO, isSameMonth, isSameDay, startOfMonth, endOfMonth, eachDayOfInterval, startOfWeek, endOfWeek } from 'date-fns'

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs)
}

// Format date for display
export function formatEventDate(dateString: string): string {
  try {
    const date = parseISO(dateString);
    return format(date, 'EEEE, MMMM d, yyyy');
  } catch (error) {
    return dateString;
  }
}

// Format date for calendar
export function formatCalendarDate(dateString: string): string {
  try {
    const date = parseISO(dateString);
    return format(date, 'MMM d');
  } catch (error) {
    return dateString;
  }
}

// Get calendar grid days
export function getCalendarDays(currentDate: Date) {
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const calendarStart = startOfWeek(monthStart);
  const calendarEnd = endOfWeek(monthEnd);

  return eachDayOfInterval({
    start: calendarStart,
    end: calendarEnd,
  });
}

// Check if date has events
export function dateHasEvents(date: Date, events: any[]): boolean {
  return events.some(event => {
    try {
      const eventDate = parseISO(event.metadata.event_date);
      return isSameDay(date, eventDate);
    } catch {
      return false;
    }
  });
}

// Get events for specific date
export function getEventsForDate(date: Date, events: any[]) {
  return events.filter(event => {
    try {
      const eventDate = parseISO(event.metadata.event_date);
      return isSameDay(date, eventDate);
    } catch {
      return false;
    }
  });
}

// Check if date is in current month
export function isCurrentMonth(date: Date, currentDate: Date): boolean {
  return isSameMonth(date, currentDate);
}

// Strip HTML tags from description
export function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '');
}

// Truncate text
export function truncateText(text: string, length: number): string {
  if (text.length <= length) return text;
  return text.slice(0, length) + '...';
}