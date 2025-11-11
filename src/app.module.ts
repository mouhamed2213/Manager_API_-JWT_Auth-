import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import AppConfig from './config/app.config';
import { ConnectionModule } from './config/connection.module';
import { AuthGuard } from './common/guards/auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { logger } from './common/middleware/logger/logger.middleware';
import { LoggerMiddleware } from './common/middleware/logger/logger.middleware';
import { MiniTracker } from './common/middleware/logger/mini.tracker.middle';
import { ArticleModule } from './article/article.module';
@Module({
  imports: [
    ConfigModule.forRoot({ load: [AppConfig], isGlobal: true }),
    ConnectionModule,
    UsersModule,
    AuthModule,
    ArticleModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    // {
    //   provide: APP_GUARD,
    //   useClass: AuthGuard,
    // },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware, MiniTracker).forRoutes('users');
  }
}
