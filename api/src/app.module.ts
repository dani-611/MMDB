import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      inject: [AppService],
      useFactory: (appService: AppService) => ({
        type: 'postgres',
        host: appService.getDatabaseHost(),
        port: appService.getDatabasePort(),
        username: appService.getDatabaseUsername(),
        password: appService.getDatabasePassword(),
        database: appService.getDatabaseName(),
        autoLoadEntities: true,
        synchronize: false,
        logging: true,
      }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
