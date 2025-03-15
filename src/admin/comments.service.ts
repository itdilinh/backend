async findByArticle(articleId: string, skip: number, limit: number) {
    return this.commentModel.find({ articleId }).skip(skip).limit(limit);
  }
  
  async countByArticle(articleId: string) {
    return this.commentModel.countDocuments({ articleId });
  }
  
  async delete(id: string) {
    return this.commentModel.findByIdAndDelete(id);
  }
  