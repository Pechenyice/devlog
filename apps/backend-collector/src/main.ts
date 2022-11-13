import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { logger: console });

  const configService: ConfigService = app.get(ConfigService);

  await app.listen(configService.get('port'));
}
bootstrap();
