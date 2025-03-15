import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split(' ')[1];

    if (!token) {
      throw new UnauthorizedException('Bạn chưa đăng nhập!');
    }

    try {
      const decoded = jwt.verify(token, 'secret');
      request.user = decoded;
      return true;
    } catch (error) {
      throw new UnauthorizedException('Token không hợp lệ!');
    }
  }
}
