export function convertToSubcurrency(amount: number | string, factor = 100): number {
  if (typeof amount === 'string') {
    amount = parseFloat(amount);
  }
  return Math.round(amount / factor);
}
