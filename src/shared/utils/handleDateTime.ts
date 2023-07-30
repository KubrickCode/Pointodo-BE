import { DateTimeFormatter, LocalDate } from 'js-joda';

export class HandleDateTime {
  private static DATE_FORMATTER = DateTimeFormatter.ofPattern('yyyy-MM-dd');
  private static today = LocalDate.now();

  static getYesterday = this.today.minusDays(1).format(this.DATE_FORMATTER);
  static getWeekAgo = this.today.minusWeeks(1).format(this.DATE_FORMATTER);
  static getAMonthAgo = this.today.minusMonths(1).format(this.DATE_FORMATTER);
}
