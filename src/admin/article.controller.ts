import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { ArticleService } from './article.service';
import { CreateArticleDto, UpdateArticleDto } from './dto/article.dto';

@Controller('articles')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Get()
  getAllArticles() {
    return this.articleService.findAll();
  }

  @Get(':id')
  getArticleById(@Param('id') id: string) {
    return this.articleService.findOne(id);
  }

  @Post()
  createArticle(@Body() createArticleDto: CreateArticleDto) {
    return this.articleService.create(createArticleDto);
  }

  @Put(':id')
  updateArticle(@Param('id') id: string, @Body() updateArticleDto: UpdateArticleDto) {
    return this.articleService.update(id, updateArticleDto);
  }

  @Delete(':id')
  deleteArticle(@Param('id') id: string) {
    return this.articleService.delete(id);
  }
}
@Get()
async getArticles(
  @Query('page') page: number = 1, 
  @Query('limit') limit: number = 10
) {
  const skip = (page - 1) * limit;
  const [articles, total] = await Promise.all([
    this.articleService.findAll(skip, limit),
    this.articleService.countArticles(),
  ]);

  return {
    data: articles,
    total,
    page,
    totalPages: Math.ceil(total / limit),
  };
}
