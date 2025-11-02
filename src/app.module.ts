import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import AppConfig from './config/app.config';
import { ConnectionModule } from './config/connection.module';
@Module({
  imports: [
    ConfigModule.forRoot({ load: [AppConfig], isGlobal: true }),
    ConnectionModule,
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
