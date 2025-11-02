import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { ConfigService } from '@nestjs/config';
import { threadId } from 'worker_threads';
import { CreaateUserDto } from './DTO/user.dto';
import { User } from './interface';
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private configService: ConfigService,
  ) {}

  // // strore user
  @HttpCode(201)
  @Post()
  async createUser(@Body() creaateUserDto: CreaateUserDto) {
    return await this.usersService.createUser(creaateUserDto);
  }

  @Get()
  async findUser() {
    return await this.usersService.find();
  }
}
