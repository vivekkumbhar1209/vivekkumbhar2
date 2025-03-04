export const formatDate = (utcDate) => {
  if (!utcDate) return 'N/A' // Handle null values safely

  const date = new Date(utcDate)
  return new Intl.DateTimeFormat('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true, // Use 12-hour format with AM/PM
    timeZone: 'Asia/Kolkata', // Convert to IST
  }).format(date)
}
