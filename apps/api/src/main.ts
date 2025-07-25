import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = app.get(ConfigService);
  const port: number = config.get<number>('API_PORT') || 4000;
  const frontendUrl: string =
    config.get<string>('FRONTEND_URL') || 'http://localhost:3000';

  app.enableCors({
    origin: frontendUrl,
    credentials: true,
  });

  await app.listen(port);
  Logger.log(`🚀 API is running on http://localhost:${port}`, 'Bootstrap');
}
bootstrap();
