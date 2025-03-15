// src/lottery/lottery.controller.ts
import { Controller, Get, Param, Query, Post } from '@nestjs/common';
import { SoiCauService } from '../services/soicau.service';
import { LotteryService } from '../services/lottery.service';


@Controller('lottery-results') // Đổi tên API theo frontend
export class LotteryController {
  constructor(private readonly lotteryService: LotteryService) {}

//   @Get('results')
// getResults(@Query('date') date?: string) {
//   return this.lotteryService.getResults(date ?? '2025-01-01'); // Giá trị mặc định
// }

  // Lấy kết quả xổ số theo ngày
  @Get()
  async getResults(@Query('date') date?: string) {
    return this.lotteryService.getResults(date);
  }

  // Lấy kết quả xổ số theo tỉnh
  @Get(':province')
  async getResultByProvince(
    @Param('province') province: string,
    @Query('date') date?: string
  ) {
    return this.lotteryService.getResultByProvince(date, province);
  }

  // Lấy dữ liệu từ Minh Ngọc và lưu vào DB
  @Post('/fetch')
  async fetchResults() {
    return this.lotteryService.fetchLotteryResults();
  }
}

// src/soi-cau/soi-cau.controller.ts (Thêm nếu thiếu)

import { SoiCauService } from './soi-cau.service';

@Controller('soi-cau')
export class SoiCauController {
  constructor(private readonly soiCauService: SoiCauService) {}

  @Get()
  getSoiCau() {
    return this.soiCauService.getData();
  }
}
