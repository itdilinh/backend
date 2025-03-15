async findAll(skip: number, limit: number) {
    return this.articleModel.find().skip(skip).limit(limit);
  }
  
  async countArticles() {
    return this.articleModel.countDocuments();
  }
  