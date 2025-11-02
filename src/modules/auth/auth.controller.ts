import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { Request } from '@nestjs/common';
import { AuthGuard } from '../../common/guards/auth.guard';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // @UseGuards(AuthGuard) // avoid this and set a global  guard
  @Post('login')
  userLogin(@Body() createAuthDto: CreateAuthDto, @Request() req) {
    console.log('Request : ', req.headers);
    console.log();
    return this.authService.login(createAuthDto);
  }

  @Post('store')
  create(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.create(createAuthDto);
  }
}
