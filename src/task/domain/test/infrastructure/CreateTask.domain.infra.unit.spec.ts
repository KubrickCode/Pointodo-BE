import { mockTaskRepository } from './TaskRepository.mock';
import { ITaskRepository } from '@task/domain/interfaces/Task.repository.interface';
import { TaskEntity } from '@task/domain/entities/Task.entity';
import { TasksDueDateEntity } from '@task/domain/entities/TasksDueDate.entity';
import { mockTask } from '@shared/test/TaskMockData';

describe('createTask', () => {
  const taskRepository: ITaskRepository = mockTaskRepository;

  it('작업 생성 성공 - DAILY,FREE', async () => {
    const userId = mockTask.userId;
    const taskType = mockTask.taskType;
    const name = mockTask.name;
    const description = mockTask.description;
    const importance = mockTask.importance;

    const createdTask: TaskEntity = {
      id: 1,
      userId,
      taskType,
      name,
      description,
      importance,
      completion: 0,
      occurredAt: new Date(),
      version: 0,
    };

    jest.spyOn(taskRepository, 'createTask').mockResolvedValue(createdTask);

    const result = await taskRepository.createTask(
      userId,
      taskType,
      name,
      description,
      importance,
    );

    expect(result).toEqual(createdTask);
    expect(taskRepository.createTask).toHaveBeenCalledWith(
      userId,
      taskType,
      name,
      description,
      importance,
    );
  });

  it('작업 생성 성공 - DUE', async () => {
    const userId = mockTask.userId;
    const taskType = mockTask.taskType;
    const name = mockTask.name;
    const description = mockTask.description;
    const importance = mockTask.importance;
    const dueDate = '2023-12-31';

    const createdTask: TaskEntity = {
      id: 1,
      userId,
      taskType,
      name,
      description,
      importance,
      completion: 0,
      occurredAt: new Date(),
      version: 0,
    };

    jest.spyOn(taskRepository, 'createTask').mockResolvedValue(createdTask);

    const createdTaskResult = await taskRepository.createTask(
      userId,
      taskType,
      name,
      description,
      importance,
    );

    expect(createdTaskResult).toEqual(createdTask);
    expect(taskRepository.createTask).toHaveBeenCalledWith(
      userId,
      taskType,
      name,
      description,
      importance,
    );

    const createdTaskDueDate: TasksDueDateEntity = {
      id: 1,
      taskId: createdTaskResult.id,
      dueDate,
    };

    jest
      .spyOn(taskRepository, 'createTaskDueDate')
      .mockResolvedValue(createdTaskDueDate);

    const createdTaskDueDateResult = await taskRepository.createTaskDueDate(
      createdTaskResult.id,
      dueDate,
    );

    expect(createdTaskDueDateResult).toEqual(createdTaskDueDate);
    expect(taskRepository.createTaskDueDate).toHaveBeenCalledWith(
      createdTaskResult.id,
      dueDate,
    );
  });
});
