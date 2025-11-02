import { Inject, Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  // constructor(private usersService: UsersService) {}
  create(createAuthDto: CreateAuthDto) {
    return 'This action adds a new auth';
  }

  login(createAuthDto: CreateAuthDto) {
    // return this.usersService.findOne(createAuthDto);
    return `this.usersService.findOne(createAuthDto)`;
  }
}
