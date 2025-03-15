import { Controller, Get, Post, Put, Delete, Query, Param, Body } from '@nestjs/common';
import { XosoService } from './xoso.service';

@Controller('xoso')
export class XosoController {
  constructor(private readonly xosoService: XosoService) {}

  @Get()
  getResults(@Query() query) {
    return this.xosoService.getResults(query);
  }

  @Post()
  createResult(@Body() body) {
    return this.xosoService.createResult(body);
  }

  @Put(':id')
  updateResult(@Param('id') id, @Body() body) {
    return this.xosoService.updateResult(id, body);
  }

  @Delete(':id')
  deleteResult(@Param('id') id) {
    return this.xosoService.deleteResult(id);
  }
}
