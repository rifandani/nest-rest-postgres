import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
// files
import { TasksModule } from '../src/tasks/tasks.module';
import { TasksService } from '../src/tasks/tasks.service';

describe('Tasks Module E2E', () => {
  let app: INestApplication;
  const tasksService = { findAll: () => ['test'] };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [TasksModule],
    })
      .overrideProvider(TasksService)
      .useValue(tasksService)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it(`GET /tasks`, () => {
    return request(app.getHttpServer()).get('/tasks').expect(200).expect({
      data: tasksService.findAll(),
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
