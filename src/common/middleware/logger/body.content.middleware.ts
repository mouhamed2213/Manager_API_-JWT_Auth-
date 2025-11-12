import {
  NestMiddleware,
  Injectable,
  BadRequestException,
} from '@nestjs/common';
import { NextFunction, Response, Request } from 'express';
import { CreateArticleDto } from 'src/db/schemas/articles.schema';

@Injectable()
export class BodyContentMiddleware implements NestMiddleware {
  bodyType!: CreateArticleDto;

  use(req: Request, res: Response, next: NextFunction) {
    if (req.body !== this.bodyType) {
      console.log('Non delcared value is detected', req.body);
      throw new BadRequestException('Non delcared value is detected', req.body);
    } else {
      console.log('[Request-Body-Content-Middleware]', req.body);
    }

    res.on('finish', () => {
      console.log('Response', res.status);
    });
    next();
  }
}
