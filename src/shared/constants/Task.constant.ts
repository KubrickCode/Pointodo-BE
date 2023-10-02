export class TaskConstant {
  static IS_COMPLETED = 1;
  static A_WEEK = 7;
  static A_MONTH = 30;
  static A_YEAR = 365;
  static DIVERSITY_GOAL = 100;
  static PRODUCTIVITY_GOAL_FOR_TODAY = 10;
  static PRODUCTIVITY_GOAL_FOR_A_WEEK_AGO = 100;
  static PRODUCTIVITY_GOAL_FOR_A_MONTH_AGO = 500;
  static DAILY_TASK_POINT = 1;
  static DAILY_TASK_CONSISTENCY_POINT = 2;
  static DEADLINE_TASK_POINT = 3;
  static DEADLINE_TASK_CONSISTENCY_POINT = 4;
  static FREE_TASK_POINT = 5;
  static FREE_TASK_CONSISTENCY_POINT = 6;

  static TASK_TYPE_ID = '작업 타입 고유 ID(INT)';
  static TASK_TYPE_NAME = '작업 타입 이름';
  static TASK_LOG_ID = '작업 로그 고유 ID(INT)';
  static TASK_NAME = '작업 이름';
  static TASK_DESC = '작업 내용';
  static TASK_IMPORTANCE = '작업 중요도';
  static TASK_COMPLETION = '작업 완료 여부';
  static TASK_VISIBLE_BY_COMPLETION = '작업 완료에 따른 보임 여부';
  static TASK_OCCURRED_AT = '작업 로그 생성 시간';
  static TASK_DUE_DATE = '작업 만료 기한';
  static TASK_PAGE = '작업 페이지';
  static TASK_LIMIT = '페이지당 작업 로그 수';
}
