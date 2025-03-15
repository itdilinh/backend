import { Injectable, HttpService } from '@nestjs/common';

@Injectable()
export class XoSoService {
  constructor(private readonly httpService: HttpService) {}

  async getKetQuaXoSo() {
    try {
      const url = 'https://www.minhngoc.net.vn/getkqxs/';
      const response = await this.httpService.get(url).toPromise();
      
      // Xử lý dữ liệu từ HTML
      const data = response.data;
      
      // Giả sử có một hàm xử lý để parse dữ liệu từ HTML
      const ketQua = this.parseKetQuaXoSo(data);

      return ketQua;
    } catch (error) {
      throw new Error('Không thể lấy dữ liệu từ Minh Ngọc');
    }
  }

  private parseKetQuaXoSo(html: string) {
    // Xử lý dữ liệu HTML thành JSON (dùng cheerio hoặc regex)
    return {
      date: '2025-03-15',
      region: 'Miền Bắc',
      jackpot: '123456',
      firstPrize: '654321',
    };
  }
}
