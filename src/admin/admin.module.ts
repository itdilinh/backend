import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { AdminAuthMiddleware } from '../middleware/admin-auth.middleware';
// src/admin/admin.module.ts
import { MongooseModule } from '@nestjs/mongoose';
import { PostSchema } from '../schemas/post.schema';
import { LotterySchema } from '../schemas/lottery.schema';
import { UserSchema } from '../schemas/user.schema';
// src/admin/admin.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post } from '../schemas/post.schema';
import { Lottery } from '../schemas/lottery.schema';
import { CreatePostDto, UpdatePostDto } from '../dtos/post.dto';
import { CreateLotteryDto, UpdateLotteryDto } from '../dtos/lottery.dto';

@Module({
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AdminAuthMiddleware).forRoutes(
      { path: 'admin/*', method: RequestMethod.ALL }
    );
  }
}
@Module({
    imports: [
      MongooseModule.forFeature([
        { name: 'Post', schema: PostSchema },
        { name: 'Lottery', schema: LotterySchema },
        { name: 'User', schema: UserSchema },
      ]),
    ],
    controllers: [AdminController],
    providers: [AdminService],
  })
  export class AdminModule {}
  
  // src/admin/admin.controller.ts
  import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
  import { AdminService } from './admin.service';
  import { CreatePostDto, UpdatePostDto } from '../dtos/post.dto';
  import { CreateLotteryDto, UpdateLotteryDto } from '../dtos/lottery.dto';
  
  @Controller('admin')
  export class AdminController {
    constructor(private readonly adminService: AdminService) {}
  
    // Quản lý bài viết
    @Post('posts')
    createPost(@Body() createPostDto: CreatePostDto) {
      return this.adminService.createPost(createPostDto);
    }
  
    @Put('posts/:id')
    updatePost(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
      return this.adminService.updatePost(id, updatePostDto);
    }
  
    @Delete('posts/:id')
    deletePost(@Param('id') id: string) {
      return this.adminService.deletePost(id);
    }
  
    @Get('posts')
    getAllPosts() {
      return this.adminService.getAllPosts();
    }
  
    // Quản lý kết quả xổ số
    @Post('lottery')
    createLottery(@Body() createLotteryDto: CreateLotteryDto) {
      return this.adminService.createLottery(createLotteryDto);
    }
  
    @Put('lottery/:id')
    updateLottery(@Param('id') id: string, @Body() updateLotteryDto: UpdateLotteryDto) {
      return this.adminService.updateLottery(id, updateLotteryDto);
    }
  
    @Delete('lottery/:id')
    deleteLottery(@Param('id') id: string) {
      return this.adminService.deleteLottery(id);
    }
  
    @Get('lottery')
    getAllLotteries() {
      return this.adminService.getAllLotteries();
    }
  }
  @Injectable()
export class AdminService {
  constructor(
    @InjectModel('Post') private postModel: Model<Post>,
    @InjectModel('Lottery') private lotteryModel: Model<Lottery>
  ) {}

  async createPost(createPostDto: CreatePostDto) {
    const newPost = new this.postModel(createPostDto);
    return await newPost.save();
  }

  async updatePost(id: string, updatePostDto: UpdatePostDto) {
    return await this.postModel.findByIdAndUpdate(id, updatePostDto, { new: true });
  }

  async deletePost(id: string) {
    return await this.postModel.findByIdAndDelete(id);
  }

  async getAllPosts() {
    return await this.postModel.find();
  }

  async createLottery(createLotteryDto: CreateLotteryDto) {
    const newLottery = new this.lotteryModel(createLotteryDto);
    return await newLottery.save();
  }

  async updateLottery(id: string, updateLotteryDto: UpdateLotteryDto) {
    return await this.lotteryModel.findByIdAndUpdate(id, updateLotteryDto, { new: true });
  }

  async deleteLottery(id: string) {
    return await this.lotteryModel.findByIdAndDelete(id);
  }

  async getAllLotteries() {
    return await this.lotteryModel.find();
  }
}

  
