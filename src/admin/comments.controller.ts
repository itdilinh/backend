@Get()
async getComments(
  @Query('articleId') articleId: string,
  @Query('page') page: number = 1,
  @Query('limit') limit: number = 10
) {
  const skip = (page - 1) * limit;
  const [comments, total] = await Promise.all([
    this.commentService.findByArticle(articleId, skip, limit),
    this.commentService.countByArticle(articleId),
  ]);

  return {
    data: comments,
    total,
    page,
    totalPages: Math.ceil(total / limit),
  };
}
@Delete(':id')
async deleteComment(@Param('id') id: string) {
  await this.commentService.delete(id);
  return { message: 'Xóa bình luận thành công' };
}
