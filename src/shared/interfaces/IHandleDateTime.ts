export interface IHandleDateTime {
  getToday: () => string;

  getYesterday: () => string;

  getAWeekAgo: () => string;

  getAMonthAgo: () => string;

  getFewSecondsLater: (seconds: number) => Date;

  getFewHoursLater: (hours: number) => Date;

  getFewDaysLater: (days: number) => Date;

  getDateString: (date: Date) => string;

  getADayAgoFromDate: (date: Date) => string;
}
