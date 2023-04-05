import 'reflect-metadata';
import { ValidationPipe } from '@nestjs/common/pipes';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as morgan from 'morgan';
import * as dotenv from 'dotenv'
import { DurationInterceptor } from './interceptors/duration/duration.interceptor';

dotenv.config();
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const corpsOptions={
    origin:['https://localhost:4200']
  }
  app.enableCors(corpsOptions);
  app.use(morgan('dev'));
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new DurationInterceptor());
  await app.listen(process.env.APP_PORT);
}
bootstrap();
