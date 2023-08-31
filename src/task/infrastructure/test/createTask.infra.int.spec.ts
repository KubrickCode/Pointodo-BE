import { PrismaService } from '@shared/service/prisma.service';
import { TaskRepository } from '../prisma/task.repository';
import { TEST1_USER_LOCAL } from '@shared/test/userMockData';
import { UUID } from 'crypto';
import { TaskEntity, TaskType_ } from '@task/domain/entities/task.entity';
import { TasksDueDateEntity } from '@task/domain/entities/tasksDueDate.entity';

describe('createTask', () => {
  let prisma: PrismaService;
  let taskRepository: TaskRepository;
  let taskId: number;

  beforeAll(() => {
    prisma = new PrismaService();
    taskRepository = new TaskRepository(prisma);
  }, 30000);

  afterAll(async () => {
    await prisma.$disconnect();
  });

  afterEach(async () => {
    await taskRepository.deleteTask(taskId);
  }, 30000);

  it('작업 생성 성공 - DAILY,FREE', async () => {
    const taskTypes: TaskType_[] = ['DAILY', 'FREE'];
    const randomIndex = Math.floor(Math.random() * taskTypes.length);

    const userId: UUID = TEST1_USER_LOCAL.id;
    const taskType: TaskType_ = taskTypes[randomIndex];
    const name = 'test';
    const description = 'test';
    const importance = 0;

    const result = await taskRepository.createTask(
      userId,
      taskType,
      name,
      description,
      importance,
    );

    expect(result).toBeInstanceOf(TaskEntity);
    expect(result.userId).toEqual(userId);
    expect(result.taskType).toEqual(taskType);
    expect(result.name).toEqual(name);
    expect(result.description).toEqual(description);
    expect(result.importance).toEqual(importance);
    expect(result.completion).toEqual(0);
    expect(result.version).toEqual(0);

    taskId = result.id;
  }, 30000);

  it('작업 생성 성공 - DUE', async () => {
    const userId: UUID = TEST1_USER_LOCAL.id;
    const taskType: TaskType_ = 'DUE';
    const name = 'test';
    const description = 'test';
    const importance = 0;
    const dueDate = '2023-12-31';

    const taskResult = await taskRepository.createTask(
      userId,
      taskType,
      name,
      description,
      importance,
    );

    expect(taskResult).toBeInstanceOf(TaskEntity);
    expect(taskResult.userId).toEqual(userId);
    expect(taskResult.taskType).toEqual(taskType);
    expect(taskResult.name).toEqual(name);
    expect(taskResult.description).toEqual(description);
    expect(taskResult.importance).toEqual(importance);
    expect(taskResult.completion).toEqual(0);
    expect(taskResult.version).toEqual(0);

    taskId = taskResult.id;

    const taskDueDateResult = await taskRepository.createTaskDueDate(
      taskId,
      dueDate,
    );

    expect(taskDueDateResult).toBeInstanceOf(TasksDueDateEntity);
    expect(taskDueDateResult.taskId).toEqual(taskId);
    expect(taskDueDateResult.dueDate).toEqual(dueDate);
  }, 30000);
});
