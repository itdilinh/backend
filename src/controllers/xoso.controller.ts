import { Controller, Get } from '@nestjs/common';
import { XoSoService } from '../services/xoso.service';

@Controller('kqxs')
export class XoSoController {
  constructor(private readonly xoSoService: XoSoService) {}

  @Get()
  async getKetQua() {
    return this.xoSoService.getKetQuaXoSo();
  }
}
