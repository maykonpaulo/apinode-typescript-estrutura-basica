import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import utc from "dayjs/plugin/utc";
import "dayjs/locale/pt-br";

import { IDateProvider } from "../interfaces/IDateProvider";

dayjs.extend(customParseFormat);
dayjs.extend(utc);
dayjs.locale("pt-br");

class DateProvider implements IDateProvider {
  toDate(date: string): Date {
    return dayjs(date).utc(true).toDate();
  }

  formatToDate(date: string, format?: string): Date {
    return dayjs(date, format ?? "DD/MM/YYYY HH:mm", true).utc(true).toDate();
  }

  timestamp(date?: Date): string {
    return (dayjs(date || new Date()).valueOf() + 10800000).toString();
  }

  convertTimestamp(value: string): Date {
    return dayjs(parseInt(value.replace(".", ""), 10)).utc(true).local().toDate();
  }

  compareInHours(start_date: Date, end_date: Date): number {
    const end_date_utc = this.convertToUTC(end_date);

    const start_date_utc = this.convertToUTC(start_date);

    return dayjs(end_date_utc).diff(start_date_utc, "hours");
  }

  convertToUTC(date?: Date): string {
    return dayjs(date || new Date()).utc().local().format();
  }

  dateNowToString(): string {
    return dayjs().utc(true).format("YYYY-MM-DD HH:mm:ss.SSS");
  }

  dateNow(): Date {
    return dayjs().utc(true).local().toDate();
  }

  toString(date: Date): string {
    return (date.toISOString().replace("T", " ")).replace("Z", "");
  }

  toShortDateString(date: Date): string {
    return dayjs(this.toString(date)).format("DD/MM/YYYY");
  }

  toShortTimeString(date: Date): string {
    return dayjs(this.toString(date)).format("HH:mm");
  }

  toFormatDateString(date: Date, format = "YYYY-MM-DD HH:mm:ss.SSS"): string {
    return dayjs(this.toString(date)).format(format);
  }

  compareInDays(start_date: Date, end_date: Date): number {
    const end_date_utc = this.convertToUTC(end_date);

    const start_date_utc = this.convertToUTC(start_date);

    return dayjs(end_date_utc).diff(start_date_utc, "days");
  }
}

export { DateProvider };
