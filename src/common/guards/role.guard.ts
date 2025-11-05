import {
  CanActivate,
  Injectable,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // check if role need
    const checkRole = this.reflector.getAllAndOverride<string[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);

    // check if role need => whene the RoleGuard is global
    if (!checkRole) {
      return true;
    }

    // get the user role from the request
    const { route, user, method } = context.switchToHttp().getRequest();
    const UserRole = user.payload.userRole;

    const canAccess: boolean = checkRole.some((role) => UserRole === role); // retun true or false
    if (!canAccess) {
      throw new ForbiddenException();
    } else {
      console.log('Handle', context.getHandler());
      console.log('class', context.getClass());
    }

    return canAccess;
  }
}
