import { Test, TestingModule } from '@nestjs/testing';
import { UserAppService } from './user.app.service';

describe('UserAppService', () => {
  let service: UserAppService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserAppService],
    }).compile();

    service = module.get<UserAppService>(UserAppService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
