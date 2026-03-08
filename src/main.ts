import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as express from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();

  // Use Render's dynamic PORT env var in production, fallback to 5822 locally
  const port = process.env.PORT || 5822;
  await app.listen(port);
  console.log(`Application is running on port: ${port}/graphql`);
}
bootstrap();
