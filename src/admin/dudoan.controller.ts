@Post()
async createPrediction(@Body() body) {
  return this.duDoanService.createPrediction(body);
}

@Put(':id')
async updatePrediction(@Param('id') id, @Body() body) {
  return this.duDoanService.updatePrediction(id, body);
}

@Delete(':id')
async deletePrediction(@Param('id') id) {
  return this.duDoanService.deletePrediction(id);
}
