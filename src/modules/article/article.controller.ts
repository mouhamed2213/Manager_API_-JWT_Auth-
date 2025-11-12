import {
  Body,
  Controller,
  Post,
  Get,
  UseGuards,
  UsePipes,
  Request,
} from '@nestjs/common';
import { ArticleService } from './article.service';
import { ValidationSchemaPipe } from 'src/common/pipes/validation.schema.pipe';
import type { Article, CreateArticleDto } from 'src/db/schemas/articles.schema';
import { createArticleSchema } from 'src/db/schemas/articles.schema';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/common/decorators/public/role.decorator';

interface article {
  test: string;
}

@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  // create Article
  @UseGuards(AuthGuard('jwt'))
  @Roles('admin')
  @Post('create')
  @UsePipes(new ValidationSchemaPipe(createArticleSchema))
  async createArticle(@Body() article: CreateArticleDto, @Request() req) {
    const { user } = req;
    const authorId: number = user['payload'].sub;
    article.author_id = authorId;
    return await this.articleService.create(article);
  }

  @Get()
  // public route
  // no login required
  //
  getAllArticle() {
    return this.articleService.getAll();
  }
}
