/**
 * Converts a timestamp into a time string
 * @param {number|string} timestamp The timestamp
 * @returns {string} Time string contaning the day, month, full year, hours, minutes and seconds
 */
export function getMessageTime(timestamp: number): string {
  let date = new Date(timestamp);
  let locale = localStorage.getItem('lang');
  if (locale) {
    locale = locale.replace('_', '-');
  }
  return date.toLocaleDateString(locale || 'en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  });
}
