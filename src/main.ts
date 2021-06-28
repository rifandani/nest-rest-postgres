import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
// files
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // global configuration
  app.setGlobalPrefix('api/v1');
  app.useGlobalPipes(new ValidationPipe());

  // run server
  await app.listen(8000);
  console.log(`⚡ App is running on: ${await app.getUrl()}`);
}
bootstrap();
