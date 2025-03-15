import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.schema';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  // Đăng ký user mới
  async register(username: string, password: string) {
    const existingUser = await this.userModel.findOne({ username });
    if (existingUser) {
      throw new Error('Tên người dùng đã tồn tại!');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new this.userModel({ username, password: hashedPassword });
    await newUser.save();
    return { message: 'Đăng ký thành công!' };
  }

  // Đăng nhập user
  async login(username: string, password: string) {
    const user = await this.userModel.findOne({ username });
    if (!user) {
      throw new UnauthorizedException('Sai tên đăng nhập hoặc mật khẩu!');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('Sai tên đăng nhập hoặc mật khẩu!');
    }

    const token = jwt.sign({ userId: user._id, role: user.role }, 'secret', {
      expiresIn: '7d',
    });

    return { token, role: user.role };
  }

  // Lấy danh sách người dùng (chỉ Admin mới truy cập được)
  async getUsers() {
    return this.userModel.find().select('-password'); // Ẩn password
  }
}
