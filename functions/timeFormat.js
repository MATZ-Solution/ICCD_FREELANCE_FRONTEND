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





