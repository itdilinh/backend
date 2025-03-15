import { Controller, Get, Query, Param, Post, Body, Delete, UseGuards, Request } from '@nestjs/common';
import { NewsService } from './news.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  // API lấy danh sách bài viết
  @Get()
  async getNews(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('keyword') keyword?: string,
    @Query('category') category?: string,
  ) {
    return this.newsService.getNews(page, limit, keyword, category);
  }

  // API lấy chi tiết bài viết theo ID
  @Get(':id')
  async getNewsById(@Param('id') id: string) {
    return this.newsService.getNewsById(id);
  }

  // API thêm bài viết (Chỉ admin)
  @UseGuards(JwtAuthGuard)
  @Post()
  async createNews(@Request() req, @Body() body: any) {
    if (req.user.role !== 'admin') {
      return { message: 'Bạn không có quyền đăng bài' };
    }
    return this.newsService.createNews(body);
  }

  // API xóa bài viết (Chỉ admin)
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteNews(@Request() req, @Param('id') id: string) {
    if (req.user.role !== 'admin') {
      return { message: 'Bạn không có quyền xóa bài viết' };
    }
    return this.newsService.deleteNews(id);
  }
}
