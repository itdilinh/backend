import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { News, NewsDocument } from './news.schema';

@Injectable()
export class NewsService {
  constructor(@InjectModel(News.name) private newsModel: Model<NewsDocument>) {}

  // Lấy danh sách tin tức (có phân trang)
  async getNews(page: number = 1, limit: number = 10, keyword?: string, category?: string) {
    const skip = (page - 1) * limit;
    const query: any = {};
    if (keyword) query.title = { $regex: keyword, $options: 'i' };
    if (category) query.category = category;

    const news = await this.newsModel.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit);
    const total = await this.newsModel.countDocuments(query);
    return { news, total, page, limit };
  }

  // Lấy chi tiết một bài viết
  async getNewsById(id: string) {
    const news = await this.newsModel.findById(id);
    if (!news) throw new NotFoundException('Bài viết không tồn tại!');
    return news;
  }

  // Thêm bài viết mới
  async createNews(newsData: Partial<News>) {
    const newNews = new this.newsModel(newsData);
    return await newNews.save();
  }

  // Xóa bài viết
  async deleteNews(id: string) {
    const deletedNews = await this.newsModel.findByIdAndDelete(id);
    if (!deletedNews) throw new NotFoundException('Bài viết không tồn tại!');
    return { message: 'Xóa bài viết thành công!' };
  }
}
