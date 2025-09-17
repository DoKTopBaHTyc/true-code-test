import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  // serve uploads
  app.use('/uploads', express.static(join(__dirname, '..', 'uploads')));

  await app.listen(3001);
  console.log('Server running on http://localhost:3001');
}
bootstrap();
