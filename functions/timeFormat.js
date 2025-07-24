export function formatSingleDate(dateInput) {
  const date = new Date(dateInput);
  const optionsStart =  { day: 'numeric', month: 'long' };
  const optionsEnd = { day: 'numeric', month: 'long', year: 'numeric' };
  const startMonth = new Intl.DateTimeFormat('en-US', optionsStart).format(date);
  const endDate = new Intl.DateTimeFormat('en-US', optionsEnd).format(date);
  return `${startMonth} - ${endDate}`;
}

export function formatDate(dateString) {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.toLocaleString('en-US', { month: 'long' });
  const year = date.getFullYear();
  return `${day}, ${month} ${year}`;
}

export function getDateLabel(timestamp) {
  const msgDate = new Date(timestamp);
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);

  const isSameDay = (d1, d2) =>
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate();

  if (isSameDay(msgDate, today)) return 'Today';
  if (isSameDay(msgDate, yesterday)) return 'Yesterday';

  return msgDate.toLocaleDateString(); // fallback: e.g., 7/22/2025
}

export function formatTo12HourTime(dateInput) {
  const date = new Date(dateInput);
  return date.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
  // fallback: e.g., 7:00 am
}






