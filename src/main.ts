import { NestFactory, PartialGraphHost } from '@nestjs/core';
import { AppModule } from './app.module';
import { ParseIntPipe, ValidationPipe } from '@nestjs/common';
import * as fs from 'fs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    snapshot: true,
    abortOnError: false, // <--- THIS
  });

  // active validation for all DTO
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // delete all value not prensent in the DTO \
      forbidNonWhitelisted: true, // throw wrror while unknow filed are sent
      transform: true, // string => number automatically
    }),

    // new ParseIntPipe ({

    // })
  );

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap().catch((err) => {
  fs.writeFileSync('graph.json', PartialGraphHost.toString() ?? '');
  process.exit(1);
});
