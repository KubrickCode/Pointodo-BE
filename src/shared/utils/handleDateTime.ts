import { DateTimeFormatter, LocalDate, LocalDateTime } from 'js-joda';

export class HandleDateTime {
  private static DATE_FORMATTER = DateTimeFormatter.ofPattern('yyyy-MM-dd');
  private static DATE_TIME_FORMATTER =
    DateTimeFormatter.ofPattern('yyyy-MM-dd HH:mm');
  private static today = LocalDate.now();
  private static nowTime = LocalDateTime.now();

  static getToday = this.today.format(this.DATE_FORMATTER);
  static getYesterday = this.today.minusDays(1).format(this.DATE_FORMATTER);
  static getAWeekAgo = this.today.minusWeeks(1).format(this.DATE_FORMATTER);
  static getAMonthAgo = this.today.minusMonths(1).format(this.DATE_FORMATTER);

  static getFewHoursLater = (hours: number) =>
    this.nowTime.plusHours(hours).format(this.DATE_TIME_FORMATTER);

  static getFewDaysLater = (days: number) =>
    this.nowTime.plusDays(days).format(this.DATE_TIME_FORMATTER);
}
