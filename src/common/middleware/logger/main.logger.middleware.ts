import { NestMiddleware, Injectable, Body } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class MainLoggerMiddlerware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const startAt = new Date().toISOString();
    const startTime = Date.now();
    const { method, ip, originalUrl } = req;
    const userAgent = req.get('user-agent');
    const authorization =
      req.headers.authorization!.split(' ')[0] || 'Non authorization found!!';
    console.log(
      `[Request-start] ${method} ${originalUrl} - ${authorization} - ${userAgent} - ${ip} ${startAt}`,
    );

    // response
    res.on('finish', () => {
      const endTime = new Date().toISOString();
      const duration = startTime - Date.now();
      const { statusCode } = res;

      console.log(
        `[Request-end] ${method} ${originalUrl} - ${statusCode}  - ${endTime} -  ${duration} ms`,
      );
    });
    next();
  }
}
