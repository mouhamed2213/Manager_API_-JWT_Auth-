import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { NextFunction, Response, Request } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
      console.log('[TokenMiddleware] Aucun header Authorization trouvé');
      return next(); // on laisse passer, le guard décidera plus tard
    }

    const [type, token] = authHeader.split(' ');

    if (type !== 'Bearer' || !token) {
      console.log('[TokenMiddleware] Mauvais format de token');
      throw new UnauthorizedException('Token mal formé ou manquant');
    }

    // ✅ On attache le token à la requête pour les guards ou strategies suivantes
    (req as any).token = token;

    console.log('[TokenMiddleware] Token extrait avec succès');
    next();
  }

  // middleware baseed on function
}

export const logger = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    console.log('[TokenMiddleware] Aucun header Authorization trouvé');
    return next(); // on laisse passer, le guard décidera plus tard
  }

  const [type, token] = authHeader.split(' ');

  if (type !== 'Bearer' || !token) {
    console.log('[TokenMiddleware] Mauvais format de token');
    throw new UnauthorizedException('Token mal formé ou manquant');
  }

  (req as any).token = token;

  console.log('[TokenMiddleware] Token extrait avec succès');
  next();
};
