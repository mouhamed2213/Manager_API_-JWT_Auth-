import { Strategy } from 'passport-local'; // type of strategy
import { PassportStrategy } from '@nestjs/passport'; // class that our trategie will extend
import { AuthService } from '../auth.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from '../dto/create-auth.dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'email',
      passwordField: 'password',
    });
  }

  // user === user ? user : UnauthorizedException
  async validate(email: string, password: string): Promise<any> {
    const userData = { email, password };
    const user = await this.authService.login(userData);

    console.log(user);
    if (!user) {
      throw new UnauthorizedException('access denied');
    }

    return user;
  }
}
