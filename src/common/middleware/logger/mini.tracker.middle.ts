import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class MiniTracker implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    //
    const start = Date.now();
    console.log(`[M-REQ]  ${req.method} ${req.originalUrl}`);

    res.on('finish', () => {
      const endTime = Date.now();
      console.log(
        `[MIDDLEWARE-END-REQUEST-RES] ${req.method} ${req.originalUrl}`,
      );
    });
    next();
  }
}
