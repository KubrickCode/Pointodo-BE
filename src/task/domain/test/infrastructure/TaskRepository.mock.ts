export const mockTaskRepository = {
  getTasksLogs: jest.fn(),
  getTotalTaskPages: jest.fn(),
  getTaskLogById: jest.fn(),
  createTask: jest.fn(),
  createTaskDueDate: jest.fn(),
  updateTask: jest.fn(),
  deleteTask: jest.fn(),
  deleteTaskDueDate: jest.fn(),
  completeTask: jest.fn(),
  cancleTaskCompletion: jest.fn(),
  resetDailyTask: jest.fn(),
  lockTask: jest.fn(),
};
