import { Module } from '@nestjs/common';
import { PG_CONNECTION } from './constants';
import { Pool } from 'pg';
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

const dbProvider = {
  provide: PG_CONNECTION,
  useValue: new Pool({
    host: process.env.DB_SERVER,
    port: Number(process.env.DB_PORT),
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
  }),
};

@Module({
  providers: [dbProvider],
  exports: [dbProvider],
})
export class DbModule {}
