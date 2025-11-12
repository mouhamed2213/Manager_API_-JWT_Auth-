import {
  Controller,
  Post,
  Body,
  Get,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { Public } from 'src/common/decorators/public/public.decorator';
import { AuthGuard } from '@nestjs/passport';
import { LocalAuthGuard } from 'src/common/guards/local.auth.guard';
import type { UserDto } from 'src/shared/schemas/user.schema';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  userLogin(@Request() req) {
    return req.user;
  }

  // @UseGuards(AuthGuard('jwt'))
  @Post('register')
  create(@Body() createAuthDto: UserDto) {
    return this.authService.create(createAuthDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  UserProfileInfo(@Request() req) {
    console.log('Request ', req.user);
    return req.user;
  }
}
