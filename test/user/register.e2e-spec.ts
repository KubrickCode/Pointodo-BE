import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';

describe('UserController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('회원가입 e2e 테스트', async () => {
    return request(app.getHttpServer())
      .post('/user/register')
      .send({ email: 'test7@test.com', password: 'test1234!@' })
      .expect(201)
      .then((response) => {
        expect(response.body).toHaveProperty('message');
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
