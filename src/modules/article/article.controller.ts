import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { ArticleService } from './article.service';
import { ValidationSchemaPipe } from 'src/common/pipes/validation.schema.pipe';
import type { Article, CreateArticleDto } from 'src/db/schemas/articles.schema';
import { createArticleSchema } from 'src/db/schemas/articles.schema';

interface article {
  test: string;
}

@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  // create Article
  @Post('create')
  @UsePipes(new ValidationSchemaPipe(createArticleSchema))
  async createArticle(@Body() article: CreateArticleDto) {
    // why request pass with  no declared value
    return article;
    // return await this.articleService.create(article);
  }
}
