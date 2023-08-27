import {
  DateTimeFormatter,
  ZoneId,
  ZonedDateTime,
  convert,
} from '@js-joda/core';
import '@js-joda/timezone';
import { IHandleDateTime } from '@shared/interfaces/IHandleDateTime';

export class HandleDateTime implements IHandleDateTime {
  private readonly DATE_FORMATTER = DateTimeFormatter.ofPattern('yyyy-MM-dd');

  private getNowZonedTime(): ZonedDateTime {
    return ZonedDateTime.now(ZoneId.of('Asia/Seoul'));
  }

  getToday = this.getNowZonedTime().format(this.DATE_FORMATTER);
  getYesterday = this.getNowZonedTime()
    .minusDays(1)
    .format(this.DATE_FORMATTER);
  getAWeekAgo = this.getNowZonedTime()
    .minusWeeks(1)
    .format(this.DATE_FORMATTER);
  getAMonthAgo = this.getNowZonedTime()
    .minusMonths(1)
    .format(this.DATE_FORMATTER);

  getFewHoursLater = (hours: number) =>
    convert(this.getNowZonedTime().plusHours(hours)).toDate();

  getFewDaysLater = (days: number) =>
    convert(this.getNowZonedTime().plusDays(days)).toDate();
}
