import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';
import { ConfigService } from '@nestjs/config';
import { threadId } from 'worker_threads';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private configService: ConfigService,
  ) {}

  // crud
  @Get()
  find() {
    return this.configService.get<string>('database.url');
  }
}
