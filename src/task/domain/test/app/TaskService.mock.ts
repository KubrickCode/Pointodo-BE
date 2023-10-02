export const mockTaskService = {
  getTasksLogs: jest.fn(),
  getTotalTaskPages: jest.fn(),
  createTask: jest.fn(),
  updateTask: jest.fn(),
  deleteTask: jest.fn(),
  completeTask: jest.fn(),
  cancleTaskCompletion: jest.fn(),
  updateConsistency: jest.fn(),
  updateDiversity: jest.fn(),
  updateProductivity: jest.fn(),
};
