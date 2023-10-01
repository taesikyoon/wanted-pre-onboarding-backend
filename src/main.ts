import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { AppConfig } from './environment/values/app.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const appConfig: AppConfig = configService.get('APP');

  app.setGlobalPrefix(appConfig.API_PREFIX, { exclude: ['./'] });
  await app.listen(appConfig.APP_PORT);
}
bootstrap();
