import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Lottery, LotteryDocument } from './lottery.schema';
import axios from 'axios';
import * as cheerio from 'cheerio';

@Injectable()
export class LotteryService {
  constructor(@InjectModel(Lottery.name) private lotteryModel: Model<LotteryDocument>) {}

  // Lấy danh sách kết quả theo ngày
  async getResults(date: string) {
    return this.lotteryModel.find({ date }).sort({ province: 1 });
  }

  // Lấy kết quả của một tỉnh theo ngày
  async getResultByProvince(date: string, province: string) {
    const result = await this.lotteryModel.findOne({ date, province });
    if (!result) throw new NotFoundException('Không có dữ liệu xổ số!');
    return result;
  }

  // Cập nhật kết quả xổ số từ Minh Ngọc
  async fetchLotteryResults() {
    const url = 'https://www.minhngoc.net.vn/ket-qua-xo-so/mien-bac.html'; // Thay đổi URL cho từng miền
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    const date = new Date().toISOString().split('T')[0]; // Lấy ngày hiện tại
    const results = {};

    $('.bkqt tbody tr').each((index, element) => {
      const prize = $(element).find('td:first-child').text().trim();
      const numbers = $(element).find('td:not(:first-child)').map((_, el) => $(el).text().trim()).get();
      if (prize) {
        results[prize] = numbers;
      }
    });

    const newResult = new this.lotteryModel({
      date,
      province: 'Miền Bắc', // Cập nhật theo từng tỉnh/thành
      results,
    });

    return await newResult.save();
  }
}
