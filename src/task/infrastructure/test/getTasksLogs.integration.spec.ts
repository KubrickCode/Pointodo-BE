import { PrismaService } from '@shared/service/prisma.service';
import { TaskRepository } from '../prisma/task.repository';

describe('createUser', () => {
  let prisma: PrismaService;
  let taskRepository: TaskRepository;

  beforeAll(() => {
    prisma = new PrismaService();
    taskRepository = new TaskRepository(prisma);
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it('작업 로그 불러오기', async () => {
    // const userId = '6e821183-ea2a-4876-88e5-c9d8a37440b0';
    // const taskType = 'DUE';
    // const limit = 10;
    // const offset = 0;
    // const order = 'newest';
    // const result = await taskRepository.getTasksLogs(
    //   userId,
    //   taskType,
    //   limit,
    //   offset,
    //   order,
    // );
    // console.log(result);
  });
});
