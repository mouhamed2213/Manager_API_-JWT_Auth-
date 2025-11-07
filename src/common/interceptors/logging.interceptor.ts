import {
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Injectable,
} from '@nestjs/common';
import { ResponseInterceptors } from '../../shared/interfaces/common.interfaces';
import { map, Observable, tap } from 'rxjs';
@Injectable()
export class LogginInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler) {
    const request = context.switchToHttp().getRequest();
    console.log('Data before', request.user);
    const now = Date.now();

    return next.handle().pipe(
      tap(() =>
        console.log(
          `tap allow me to see data passe accross the observable : ${Date.now() - now}ms`,
        ),
      ),

      map((data) => {
        // let exlud the id iat and  exp to retun the client a clean response

        const { sub, iat, exp, ...cleanData } = data.payload;
        console.log('Data after cleaned up  ', cleanData);
        return cleanData;
      }),
    );
  }
}
