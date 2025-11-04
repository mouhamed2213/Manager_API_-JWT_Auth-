import { Injectable } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { CreateAuthDto as AuthDto } from '../dto/create-auth.dto';
import { Payload } from '../../../shared/interfaces/common.interfaces';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // replace the extractDataFromHeader(...)  in the auth.guard
      secretOrKey: configService.get<string>('jwt_values.secret_key')!, // the jwtService.verify(token,{secrecte : })
      ignoreExpiration: false,
    });
  }

  async validate(payload: Payload) {
    // reaplce the paylod decrypte and returned by the  verification / and se manually set of  request['user'] = payload;
    return payload;
  }
}

// he also handle the reflector by gettin public route or note
