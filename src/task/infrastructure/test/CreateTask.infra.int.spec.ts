import { PrismaService } from '@shared/service/Prisma.service';
import { TaskRepository } from '../prisma/Task.repository';
import { TaskEntity } from '@task/domain/entities/Task.entity';
import { TasksDueDateEntity } from '@task/domain/entities/TasksDueDate.entity';
import { mockTask } from '@shared/test/TaskMockData';

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
    const userId = mockTask.userId;
    const taskType = mockTask.taskType;
    const name = mockTask.name;
    const description = mockTask.description;
    const importance = mockTask.importance;

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
    const userId = mockTask.userId;
    const taskType = mockTask.taskType;
    const name = mockTask.name;
    const description = mockTask.description;
    const importance = mockTask.importance;
    const dueDate = '2099-12-30';

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
