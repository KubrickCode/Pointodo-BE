export interface IHandleDateTime {
  getToday: string;
  getYesterday: string;
  getAWeekAgo: string;
  getAMonthAgo: string;

  getFewHoursLater: (hours: number) => Date;

  getFewDaysLater: (days: number) => Date;
}
