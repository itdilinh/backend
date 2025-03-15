import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AdminAuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    if (!req.user || req.user.role !== 'admin') {
      throw new UnauthorizedException('Bạn không có quyền truy cập');
    }
    next();
  }
}
