// Helper function to filter date (a week/a month/a year)
function getFilterDate(filterInput) {
  const now = new Date();

  return new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() - filterInput
  ).getTime();
}

function formatCurrency(number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(number);
}
export { getFilterDate, formatCurrency };
