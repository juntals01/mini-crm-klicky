import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as path from 'path';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: path.resolve(__dirname, '../../.env.local'),
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => {
        const dbPath = config.get<string>('DATABASE_PATH') || 'data.db';
        console.log('📁 DATABASE_PATH:', dbPath);
        return {
          type: 'sqlite',
          database: dbPath,
          entities: [path.join(__dirname, '**', '*.entity.{ts,js}')],
          synchronize: true,
          logging: true,
        };
      },
      inject: [ConfigService],
    }),
    UserModule,
  ],
})
export class AppModule {}
