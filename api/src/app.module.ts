import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { buildDataSourceOptions } from './db/data-source';
import { GenresModule } from './genres/genres.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        ...buildDataSourceOptions({
          getDatabaseHost: () => configService.get<string>('DB_HOST'),
          getDatabasePort: () => configService.get<number>('DB_PORT', 5432),
          getDatabaseUsername: () => configService.get<string>('DB_USERNAME'),
          getDatabasePassword: () => configService.get<string>('DB_PASSWORD'),
          getDatabaseName: () => configService.get<string>('DB_NAME'),
        }),
        autoLoadEntities: true,
      }),
    }),
    GenresModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
