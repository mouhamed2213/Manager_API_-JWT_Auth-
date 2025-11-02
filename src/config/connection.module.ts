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
        try {
          // Ajoutons un try...catch pour être sûr
          console.log('--- DÉBUT DE LA CRÉATION DE LA CONNEXION DB ---');
          console.log('User:', configService.get<string>('database.user'));
          console.log('Host:', configService.get<string>('database.host'));
          console.log('Port:', configService.get<number>('database.port'));
          console.log('Database:', configService.get<string>('database.name'));

          const connection = await mysql.createPool({
            user: configService.get<string>('database.user'),
            host: configService.get<string>('database.host'),
            port: configService.get<number>('database.port'),
            database: configService.get<string>('database.name'),
            password: configService.get<string>('database.password'),
          });

          console.log('--- POOL DE CONNEXION CRÉÉ AVEC SUCCÈS ---');
          const db = drizzle(connection);
          console.log('--- INSTANCE DRIZZLE CRÉÉE AVEC SUCCÈS ---');
          return db;
        } catch (error) {
          console.error('!!!!!! ERREUR FATALE DANS USEFACTORY !!!!!!', error);
          throw error; // Il est crucial de relancer l'erreur
        }
      },
    },
  ],
  exports: [DRIZZLE_TOKEN],
})
export class ConnectionModule {}
