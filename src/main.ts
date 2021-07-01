import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
// files
import { AppModule } from './app.module';
import { TransformInterceptor } from './transform.interceptor';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const logger = new Logger();
  const PORT = process.env.PORT || 8000;

  // global configuration
  app.enableCors();
  app.setGlobalPrefix('api/v1');
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new TransformInterceptor()); // to omit user object from tasks controller return

  // run server
  await app.listen(PORT);
  logger.debug(`⚡ App is running on: ${await app.getUrl()}`);
}
bootstrap();
