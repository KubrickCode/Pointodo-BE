import {
  DateTimeFormatter,
  LocalDate,
  ZoneId,
  ZonedDateTime,
  convert,
} from '@js-joda/core';
import '@js-joda/timezone';

export class HandleDateTime {
  private static DATE_FORMATTER = DateTimeFormatter.ofPattern('yyyy-MM-dd');
  private static today = LocalDate.now();
  private static nowZonedTime = ZonedDateTime.now(ZoneId.of('Asia/Seoul'));

  static getToday = this.today.format(this.DATE_FORMATTER);
  static getYesterday = this.today.minusDays(1).format(this.DATE_FORMATTER);
  static getAWeekAgo = this.today.minusWeeks(1).format(this.DATE_FORMATTER);
  static getAMonthAgo = this.today.minusMonths(1).format(this.DATE_FORMATTER);

  static getFewHoursLater = (hours: number) =>
    convert(this.nowZonedTime.plusHours(hours)).toDate();

  static getFewDaysLater = (days: number) =>
    convert(this.nowZonedTime.plusDays(days)).toDate();
}
