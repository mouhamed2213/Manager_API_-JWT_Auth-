import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request } from 'express';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

interface Payload {
  sub: number;
  email: string;
  userRole: string;
  iat: number;
  exp: number;
}

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
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
    try {
      // chek token validity
      const payload: Payload = await this.jwtService.verifyAsync(token, {
        secret: this.configService.get<string>('jwt_values.secret_key'),
      });
      console.log('Payload verified : ', payload);
      request['user'] = payload;
    } catch (error) {
      throw new UnauthorizedException(
        'Unauthorized : token Expired or corrupted',
      );
    }

    return true;
  }

  // function to extract the token and  authozisaion type
  extractDataFromHeader(req: Request): string | undefined {
    const [type, token] = req.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
