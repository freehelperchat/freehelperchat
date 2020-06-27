import { DEFAULT_LANGUAGE } from 'constants/translation';

/**
 * Converts a timestamp into a time string
 * @param timestamp The timestamp
 * @returns Time string contaning the day, month, full year, hours, minutes and seconds
 */
export function getMessageTime(timestamp: number): string {
  const date = new Date(timestamp);
  const locale = localStorage.getItem('lang');
  return date.toLocaleDateString(locale || DEFAULT_LANGUAGE, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  });
}
