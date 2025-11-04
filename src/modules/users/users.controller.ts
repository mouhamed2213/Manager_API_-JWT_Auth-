import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { ConfigService } from '@nestjs/config';
import { CreaateUserDto } from './DTO/user.dto';
import { User } from './interface';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/common/decorators/public/role.decorator';
import { RoleGuard } from 'src/common/guards/role.guard';
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private configService: ConfigService,
  ) {}

  // // strore user
  @HttpCode(201)
  @UseGuards(AuthGuard('jwt'))
  @Post()
  async createUser(@Body() creaateUserDto: CreaateUserDto) {
    return await this.usersService.createUser(creaateUserDto);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async findUser() {
    return await this.usersService.find();
  }

  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Roles('cliednt')
  @Get('profile')
  UserProfileInfo(@Request() req) {
    // console.log(' User Profile  ');
    return req.user;
  }
}
