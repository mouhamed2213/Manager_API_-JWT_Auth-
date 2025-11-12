import { Inject, Injectable } from '@nestjs/common';
import { DRIZZLE_TOKEN } from '../../config/connection.module';
import { Article } from 'src/db/schemas/articles.schema';
import { CreateArticleDto } from 'src/db/schemas/articles.schema';

@Injectable()
export class ArticleService {
  constructor(@Inject(DRIZZLE_TOKEN) private db: any) {}
  // create article
  async create(article: CreateArticleDto): Promise<Article | undefined> {
    return await undefined;
  }
}
