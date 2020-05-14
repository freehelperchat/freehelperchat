/**
 * Converts a timestamp into a time string
 * @param {number|string} timestamp The timestamp
 * @returns {string} Time string contaning the day, month, full year, hours, minutes and seconds
 */
export function getMessageTime(timestamp: number): string {
  const date = new Date(timestamp);
  const locale = localStorage.getItem('lang');
  return date.toLocaleDateString(locale || 'en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  });
}
