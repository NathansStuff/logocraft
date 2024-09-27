export function convertToSubcurrency(amount: number | string, factor = 100) {
  if (typeof amount === 'string') {
    amount = parseFloat(amount);
  }
  return Math.round(amount / factor);
}
