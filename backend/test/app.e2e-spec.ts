import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', async () => {
    const result = await request(app.getHttpServer()).get('/init-data');
    expect(result.status).toBe(200);
    expect(result.body.artistsList.length).toBeGreaterThan(0);
    expect(+result.body.dbStatistics.artists_qty).toBeGreaterThan(0);
    expect(+result.body.dbStatistics.releases_qty).toBeGreaterThan(0);
    expect(+result.body.dbStatistics.youtube_movies_qty).toBeGreaterThan(0);
    expect(+result.body.dbStatistics.tracks_qty).toBeGreaterThan(0);
    console.log(result.body);

    // .expect('Hello World!');
  });
});
