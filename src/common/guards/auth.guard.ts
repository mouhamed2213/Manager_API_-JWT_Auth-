import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request } from 'express';
import { Reflector } from '@nestjs/core';
import { is } from 'drizzle-orm';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // check if the @public is present  handle/methode
    const isPublic = this.reflector.getAllAndOverride<
      boolean | string | number
    >('public', [context.getHandler(), context.getClass()]);

    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const token = this.extractDataFromHeader(request);
    if (!token) {
      console.log('Token Missed : auth  guard blocked');
      throw new UnauthorizedException('Veuillez vous connecter ');
    }

    return true;
  }

  // function to extract the token and  authozisaion type
  extractDataFromHeader(req: Request): string | undefined {
    const [type, token] = req.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
