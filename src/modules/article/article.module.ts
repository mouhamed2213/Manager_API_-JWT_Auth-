import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ArticleService } from './article.service';
import { ArticleController } from './article.controller';
import path from 'path';
import { BodyContentMiddleware } from 'src/common/middleware/logger/body.content.middleware';

@Module({
  controllers: [ArticleController],
  providers: [ArticleService],
})
export class ArticleModule {}
