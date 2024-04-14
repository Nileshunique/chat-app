export function extractTime(dateString) {
  if (dateString) {
    const date = new Date(dateString);
    const hours = padZero(date.getHours());
    const minutes = padZero(date.getMinutes());
    return `${hours}:${minutes}`;
  }
  return "00:00";
}

const padZero = (number) => {
  return number.toString().padStart(2, '0')
}