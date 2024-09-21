import { format } from 'date-fns';

function getOrdinalSuffix(day: number): 'th' | 'st' | 'nd' | 'rd' {
  if (day > 3 && day < 21) return 'th'; // catch 11th, 12th, 13th
  switch (day % 10) {
    case 1:
      return 'st';
    case 2:
      return 'nd';
    case 3:
      return 'rd';
    default:
      return 'th';
  }
}

export function formatDateRange(date: Date): string {
  const day = format(date, 'd');
  const monthYear = format(date, 'MMMM yyyy');
  const dayWithSuffix = `${day}${getOrdinalSuffix(Number(day))}`;
  return `${dayWithSuffix} ${monthYear}`;
}
