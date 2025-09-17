import { toDate, format } from 'date-fns-tz';
export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const vnTime = (
  utcDateString: string,
  fm: string = 'dd/MM/yyyy HH:mm:ss',
) => {
  if (!utcDateString) {
    return '';
  }
  const utcDate = new Date(utcDateString);
  const vietnamDate = toDate(utcDate, { timeZone: 'Asia/Ho_Chi_Minh' });
  const formatted = format(vietnamDate, fm, {
    timeZone: 'Asia/Ho_Chi_Minh',
  });
  return formatted;
};
