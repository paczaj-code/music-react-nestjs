import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DbModule } from './db.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { NestCrawlerModule } from 'nest-crawler';

import { CrawlerService } from './wsc.service';

@Module({
  imports: [
    DbModule,
    NestCrawlerModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'frontend'),
    }),
  ],
  controllers: [AppController],
  providers: [AppService, CrawlerService],
})
export class AppModule {}
