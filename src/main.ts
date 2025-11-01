import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // active validation for all DTO
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // delete all value not prensent in the DTO \
      forbidNonWhitelisted: true, // throw wrror while unknow filed are sent
      transform: true, // string => number automatically
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
