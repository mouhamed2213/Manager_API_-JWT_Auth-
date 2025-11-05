import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/interface';
import { Payload } from 'src/shared/interfaces/common.interfaces';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}
  create(createAuthDto: CreateAuthDto) {
    return 'This action adds a new auth';
  }

  async validateUser(createAuthDto: CreateAuthDto) {
    const user: User = await this.usersService.findOne(createAuthDto);
    if (!user) {
      throw new UnauthorizedException('Email or password incorrect');
    }
    // payload containt
    const { password, ...userP } = user;

    // generate the access token
    const payload: Payload = {
      sub: userP.id!,
      email: userP.email,
      userRole: userP.role!,
    };
    const access_token = await this.jwtService.signAsync(payload);

    return { access_token };
  }
}
