import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CrawlerService } from './wsc.service';
// import { PG_CONNECTION } from './constants';

describe('AppController', () => {
  let appController: AppController;
  // let appController: AppController;
  let appService: AppService;
  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        {
          provide: AppService,
          useValue: {
            getRandomYT: jest
              .fn()
              .mockImplementation(() => Promise.resolve({ id: '1' })),
          },
        },
        {
          provide: CrawlerService,
          useValue: {
            scrape: jest.fn().mockImplementation(() => Promise.resolve({})),
          },
        },
      ],
    }).compile();

    appController = app.get<AppController>(AppController);
    appService = app.get<AppService>(AppService);
  });

  describe('root', () => {
    it('should return "Hello World!"', async () => {
      const test = await appController.getRandomYT('10');
      expect(appService.getRandomYT).toHaveBeenCalled();
      expect(test.id).toEqual('1');
    });
  });
});
