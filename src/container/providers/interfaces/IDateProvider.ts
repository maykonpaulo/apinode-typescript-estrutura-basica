/* eslint-disable @typescript-eslint/no-explicit-any */
interface IDateProvider {
  toDate(date: string, format?: string): Date;
  formatToDate(date: string, format?: string): Date;
  timestamp(date?: Date): string;
  convertTimestamp(value: string): Date;
  compareInHours(start_date: Date, end_date: Date): number;
  convertToUTC(date?: Date): string;
  dateNowToString(): string;
  dateNow(): Date;
  toString(date: Date): string;
  toShortDateString(date: Date): string;
  toShortTimeString(date: Date): string;
  toFormatDateString(date: Date, format?: string): string;
  compareInDays(start_date: Date, end_date: Date): number;
}

export { IDateProvider };
