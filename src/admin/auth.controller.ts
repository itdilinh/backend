import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService, private usersService: UsersService) {}

  @Post('login')
  async login(@Body() body) {
    const user = await this.usersService.findByEmail(body.email);
    if (!user || user.password !== body.password) {
      throw new UnauthorizedException('Email hoặc mật khẩu không đúng');
    }

    const token = this.authService.generateToken(user);
    return { token, user };
  }
}
