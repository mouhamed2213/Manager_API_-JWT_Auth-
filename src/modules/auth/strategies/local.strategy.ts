import { Strategy } from 'passport-local'; // type of strategy
import { PassportStrategy } from '@nestjs/passport'; // class that our trategie will extend
import { AuthService } from '../auth.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from '../dto/create-auth.dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  // user === user ? user : UnauthorizedException
  async validate(createAuthDto: CreateAuthDto): Promise<any> {
    const user = await this.authService.login(createAuthDto);
    if (!user) {
      throw new UnauthorizedException('access denied');
    }

    console.log('Hello from The Strategy', user);
    return user;
  }
}
