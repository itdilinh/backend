import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { User, UserSchema } from './user.schema';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { AdminModule } from './admin/admin.module';
import { UserModule } from './user/user.module';
import { HttpModule } from '@nestjs/axios';
import { XoSoService } from './services/xoso.service';
import { XoSoController } from './controllers/xoso.controller';
@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/mydatabase'),
    UserModule,
  ],
})
@Module({
  imports: [HttpModule],
  controllers: [XoSoController],
  providers: [XoSoService],
})

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    PassportModule,
    JwtModule.register({
      secret: 'SECRET_KEY', // Thay bằng khóa bí mật thực tế
      signOptions: { expiresIn: '1d' }, // Token hết hạn sau 1 ngày
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}


import { AuthModule } from './auth.module';
import { NewsModule } from './news/news.module';
import { LotteryModule } from './lottery/lottery.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/soicau'),
    AuthModule,
    NewsModule,
    LotteryModule,
  ],
  controllers: [],
  providers: [],
  
@Module({
  imports: [AdminModule],
})
})
export class AppModule {}
