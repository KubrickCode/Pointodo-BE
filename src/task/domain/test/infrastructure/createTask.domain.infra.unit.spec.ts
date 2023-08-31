import { mockTaskRepository } from './taskRepository.mock';
import { ITaskRepository } from '@task/domain/interfaces/task.repository.interface';
import { TaskEntity, TaskType_ } from '@task/domain/entities/task.entity';
import { UUID } from 'crypto';
import { TEST1_USER_LOCAL } from '@shared/test/userMockData';
import { TasksDueDateEntity } from '@task/domain/entities/tasksDueDate.entity';

describe('createTask', () => {
  const taskRepository: ITaskRepository = mockTaskRepository;

  it('작업 생성 성공 - DAILY,FREE', async () => {
    const taskTypes: TaskType_[] = ['DAILY', 'FREE'];
    const randomIndex = Math.floor(Math.random() * taskTypes.length);

    const userId: UUID = TEST1_USER_LOCAL.id;
    const taskType: TaskType_ = taskTypes[randomIndex];
    const name = 'test';
    const description = 'test';
    const importance = 0;

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
    const userId: UUID = TEST1_USER_LOCAL.id;
    const taskType: TaskType_ = 'DUE';
    const name = 'test';
    const description = 'test';
    const importance = 0;
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
