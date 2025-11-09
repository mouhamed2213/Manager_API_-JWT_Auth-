import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  Request,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { ConfigService } from '@nestjs/config';
import { CreaateUserDto } from './DTO/user.dto';
import { User } from './interface';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/common/decorators/public/role.decorator';
import { RoleGuard } from 'src/common/guards/role.guard';
import { JwtAuthGuard } from 'src/common/guards/jwt.auth.guard';
import { UseInterceptors } from '@nestjs/common';
import { LogginInterceptor } from '../../common/interceptors/logging.interceptor';
import { TestTransformPipe } from '../../common/pipes/testTransform.pipe';
import { ValidationSchemaPipe } from '../../common/pipes/validation.schema.pipe';
import type { UserLoginDto } from 'src/shared/interfaces/schemas/user.schema';
import { userSchema } from 'src/shared/interfaces/schemas/user.schema';
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private configService: ConfigService,
  ) {}

  // // strore user
  @HttpCode(201)
  @UseGuards(JwtAuthGuard) // custom gruar file for morre access
  @Post('create')
  async createUser(@Body() creaateUserDto: CreaateUserDto) {
    return await this.usersService.createUser(creaateUserDto);
  }

  @Get('all-users')
  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Roles('admin')
  async findUser() {
    return await this.usersService.find();
  }

  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Roles('admin')
  @Get('profile')
  @UseInterceptors(LogginInterceptor)
  UserProfileInfo(@Request() req) {
    // console.log(' User Profile  ');
    return req.user;
  }

  // find user by id
  @Get(':id')
  async findbyId(@Param('id', TestTransformPipe) id: string) {
    console.log('From the controller  to find user by id : ', id);
  }

  // test validataoin Usind zod
  @Post('validate')
  @UsePipes(new ValidationSchemaPipe(userSchema))
  async test(@Body() body: UserLoginDto) {
    return body;
  }
}
