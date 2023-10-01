import { ConfigService } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => {
        const databaseConfig = configService.get('DATABASE');

        return {
          type: databaseConfig.DATABASE_TYPE,
          host: databaseConfig.DATABASE_HOST,
          port: databaseConfig.DATABASE_PORT,
          username: databaseConfig.DATABASE_USER,
          password: databaseConfig.DATABASE_PASS,
          database: databaseConfig.DATABASE_DB,
          autoLoadEntities: true,
          logging: databaseConfig.LOGGING,
          synchronize: databaseConfig.SYNCHRONIZE,
          charset: 'utf8mb4',
        };
      },
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
