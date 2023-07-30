import { PrismaService } from '@shared/service/prisma.service';
import { TaskAdminRepository } from '../../prisma/task.admin.repository';
import { initialTaskTypes } from './initialTaskTypes';

describe('createInitialTaskTypes', () => {
  let prisma: PrismaService;
  let taskAdminRepository: TaskAdminRepository;

  beforeAll(async () => {
    prisma = new PrismaService();
    taskAdminRepository = new TaskAdminRepository(prisma);
    await prisma.user.deleteMany();
    await prisma.taskTypes.deleteMany();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it('초기 뱃지 타입 생성 In DB', async () => {
    for (const item of initialTaskTypes) {
      await taskAdminRepository.create(item);
    }
  });
});
