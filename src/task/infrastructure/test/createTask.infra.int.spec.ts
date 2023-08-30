import { PrismaService } from '@shared/service/prisma.service';
import { TaskRepository } from '../prisma/task.repository';
import { TEST1_USER_LOCAL } from '@shared/test/userMockData';
import { UUID } from 'crypto';
import { TaskEntity, TaskType_ } from '@task/domain/entities/task.entity';

describe('createTask', () => {
  let prisma: PrismaService;
  let taskRepository: TaskRepository;
  let taskId: number;

  beforeAll(() => {
    prisma = new PrismaService();
    taskRepository = new TaskRepository(prisma);
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  afterEach(async () => {
    await taskRepository.deleteTask(taskId);
  });

  it('작업 생성 성공', async () => {
    const taskTypes: TaskType_[] = ['DAILY', 'DUE', 'FREE'];
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
  });
});
