import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(private configService: ConfigService) {}

  getDatabaseHost(): string | undefined {
    return this.configService.get<string>('DB_HOST');
  }
  getDatabasePort(): number | undefined {
    return this.configService.get<number>('DB_PORT', 5432);
  }
  getDatabaseUsername(): string | undefined {
    return this.configService.get<string>('DB_USERNAME');
  }
  getDatabasePassword(): string | undefined {
    return this.configService.get<string>('DB_PASSWORD');
  }
  getDatabaseName(): string | undefined {
    return this.configService.get<string>('DB_NAME');
  }

  getHello(): string {
    return 'Hello World!';
  }
}
