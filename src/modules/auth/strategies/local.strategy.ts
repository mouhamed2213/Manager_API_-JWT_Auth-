import { Strategy } from 'passport-local'; // local passport ( classic login)
import { PassportStrategy } from '@nestjs/passport'; // class that our trategie will extend
import { AuthService } from '../auth.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  // validate the user login and return a token
  constructor(private authService: AuthService) {
    super({
      usernameField: 'email',
      passwordField: 'password',
    });
  }

  // user === user ? user : UnauthorizedException
  async validate(email: string, password: string): Promise<any> {
    const userData = { email, password };
    const user = await this.authService.validateUser(userData);
    console.log(' User validated : ', user);
    return user;
  }
}
