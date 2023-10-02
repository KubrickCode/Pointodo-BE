export const mockPointRepository = {
  getEarnedPointsLogs: jest.fn(),
  getSpentPointsLogs: jest.fn(),
  getTotalPointPages: jest.fn(),
  isContinuous: jest.fn(),
  createEarnedPointLog: jest.fn(),
  createSpentPointLog: jest.fn(),
  countTasksPerDate: jest.fn(),
  calculateUserPoints: jest.fn(),
  deleteEarnedPointLog: jest.fn(),
  deleteSpentPointLog: jest.fn(),
  calculateConsistency: jest.fn(),
};
