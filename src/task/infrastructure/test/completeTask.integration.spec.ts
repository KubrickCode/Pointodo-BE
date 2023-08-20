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

  it('작업 완료 In DB', async () => {
    // const req = {
    //   id: 1,
    //   taskTypesId: 1,
    //   userId: '82f7955d-3128-42a3-bd64-e8a7c6c2cdce',
    // };
    // await taskRepository.completeTask(req);
  });
});
