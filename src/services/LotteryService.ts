import { Injectable } from '@nestjs/common';
import { LotteryService } from '../services/lottery.service';
import { SoiCauService } from '../services/soi-cau.service';

@Injectable()
export class LotteryService {
  private results = [
    { date: '2025-03-14', numbers: [12, 34, 56, 78, 90] },
    { date: '2025-03-13', numbers: [11, 22, 33, 44, 55] },
  ];

  getResults(date?: string) {
    if (date) {
      return this.results.find(result => result.date === date) || null;
    }
    return this.results;
  }
}
