import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { drizzle } from 'drizzle-orm/singlestore';
import * as mysql from 'mysql2/promise';
import { Pool } from 'node_modules/mysql2/typings/mysql/lib/Pool';

export const DRIZZLE_TOKEN = 'DRIZZLE_INSTANCE';

@Global()
@Module({
  providers: [
    {
      provide: DRIZZLE_TOKEN,
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const connection = await mysql.createPool({
          user: configService.get<string>('database.user'),
          host: configService.get<string>('database.host'),
          port: configService.get<number>('database.port'),
          database: configService.get<string>('database.name'),
          password: configService.get<string>('database.password'),
        });

        // create the instance
        return drizzle(connection);
      },
    },
  ],
  exports: [DRIZZLE_TOKEN],
})
export class ConnectionModule {}
