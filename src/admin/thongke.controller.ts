@Get()
async getStatistics(@Query() query) {
  return this.thongKeService.calculateStatistics(query);
}
