import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';
import { REGISTER_SUCCESS_MESSAGE } from '@shared/messages/user/user.messages';

describe('UserController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('회원가입 e2e 테스트', async () => {
    const response = await request(app.getHttpServer())
      .post('/user/register')
      .send({ email: 'test9@test.com', password: 'test1234!@' })
      .expect(201);

    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toEqual(REGISTER_SUCCESS_MESSAGE);
  });
});
