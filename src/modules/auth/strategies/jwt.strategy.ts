import { Injectable } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { CreateAuthDto as AuthDto } from '../dto/create-auth.dto';
import { Payload } from '../../../shared/interfaces/common.interfaces';
import { ConfigService } from '@nestjs/config';

// extract token from incomig request validated , used to protect rout
// not token not connect , have a token you can access
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get<string>('jwt_values.secret_key')!,
      ignoreExpiration: false,
    });
  }

  async validate(payload: Payload) {
    console.log('jwt validated : ', payload);
    return { payload }; // containt user information decoded
  }
}

// he also handle the reflector by gettin public route or note
