import { Controller, Post, Body, Get, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { Public } from 'src/common/decorators/public/public.decorator';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // @UseGuards(AuthGuard) // avoid this and set a global  guard
  @Public()
  @Post('login')
  userLogin(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.login(createAuthDto);
  }

  @Post('store')
  create(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.create(createAuthDto);
  }

  @Get('profile')
  test(@Request() req) {
    // console.log('Request ');
    return req.user;
  }
}
