import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../../src/app.module';

describe('TaskController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ transform: true }));
    await app.init();
  });

  it('작업 완료 동시성 문제 e2e 테스트', async () => {
    let token: string;
    let taskId: number;
    await request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: 'test@test.test', password: 'test1234!@' })
      .expect(201)
      .then((response) => {
        token = response.body.accessToken;
      });

    await request(app.getHttpServer())
      .post('/task/create')
      .set('Authorization', 'Bearer ' + token)
      .send({ taskType: '매일 작업', name: 'test', description: 'test' })
      .expect(201)
      .then((response) => {
        expect(response.body).toHaveProperty('message');
      });

    await request(app.getHttpServer())
      .get('/task/daily')
      .set('Authorization', 'Bearer ' + token)
      .expect(200)
      .then((response) => {
        taskId = response.body.at(-1).id;
      });

    await request(app.getHttpServer())
      .patch('/task/complete/' + taskId)
      .set('Authorization', 'Bearer ' + token)
      .expect(200)
      .then((response) => {
        console.log(response.body);
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
