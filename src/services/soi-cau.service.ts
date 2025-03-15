import { Injectable } from '@nestjs/common';
import axios from 'axios';
import * as cheerio from 'cheerio';
import { SoiCauService } from '../services/soi-cau.service';


@Injectable()
export class SoiCauService {
  private readonly url = 'https://example.com/soicau';

  async getSoiCauData(): Promise<any> {
    try {
      const response = await axios.get(this.url);
      const $ = cheerio.load(response.data);
      
      const result: any[] = [];
      $('.soi-cau-item').each((index, element) => {
        result.push({
          title: $(element).find('.title').text(),
          number: $(element).find('.number').text(),
        });
      });

      return result;
    } catch (error) {
      console.error('Error fetching soi cau data:', error);
      throw new Error('Failed to fetch soi cau data');
    }
  }
  getData() {
    return { message: "Dữ liệu soi cầu" };
}
}

  