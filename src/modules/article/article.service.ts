import { Inject, Injectable } from '@nestjs/common';
import { DRIZZLE_TOKEN } from '../../config/connection.module';
import { Article } from 'src/db/schemas/articles.schema';
import { CreateArticleDto } from 'src/db/schemas/articles.schema';
import { ArticleTable } from 'src/db/schemas/articles.schema';
import { eq } from 'drizzle-orm';
import { error } from 'console';

@Injectable()
export class ArticleService {
  constructor(@Inject(DRIZZLE_TOKEN) private db: any) {}

  // create article
  async create(article: CreateArticleDto): Promise<Article | undefined> {
    try {
      // insertion
      const [result] = await this.db.insert(ArticleTable).values(article);
      if (result.affectedRows > 0) {
        console.log('Article cree avec succes');
        return;
      }
    } catch (error) {
      console.log('Error while inserting article ', error);
      throw error;
    }
    return;
  }

  // get all article
  async getAll(): Promise<Article[]> {
    try {
      const result = await this.db.select().from(ArticleTable);
      console.log(result);
      return result;
    } catch (error) {
      console.log('Error while getting articles');
      throw error;
    }
  }
}
