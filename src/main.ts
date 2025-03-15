import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as express from 'express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Phục vụ frontend đã build
  app.use(express.static(join(__dirname, '../frontend/.output/public')));

  // Chuyển hướng tất cả request không phải API về frontend
  app.use('*', (req, res) => {
    res.sendFile(join(__dirname, '../frontend/.output/public/index.html'));
  });

  await app.listen(3000);
}
bootstrap();
