import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export class DatabaseService {
  constructor(private configService: ConfigService) {}

  getTypeOrmConfig(): TypeOrmModuleOptions {
    if (this.configService.get('NODE_ENV') === 'test') {
      return {
        type: 'postgres',
        host: this.configService.get('TEST_DB_HOST'),
        port: this.configService.get('TEST_DB_PORT'),
        username: this.configService.get('TEST_DB_USER'),
        password: this.configService.get('TEST_DB_PASSWORD'),
        database: this.configService.get('TEST_DB_NAME'),
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        synchronize: true,
        dropSchema: true,
      };
    } else if (this.configService.get('NODE_ENV') === 'development') {
      return {
        type: 'postgres',
        host: this.configService.get('DEV_DB_HOST'),
        port: this.configService.get('DEV_DB_PORT'),
        username: this.configService.get('DEV_DB_USER'),
        password: this.configService.get('DEV_DB_PASSWORD'),
        database: this.configService.get('DEV_DB_NAME'),
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        synchronize: true,
      };
    } else if (
      this.configService.get('DATABASE_URL') &&
      this.configService.get('NODE_ENV') === 'production'
    ) {
      return {
        type: 'postgres',
        url: this.configService.get('DATABASE_URL'),
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        synchronize: true,
        ssl: {
          rejectUnauthorized: false,
        },
      };
    } else if (
      this.configService.get('PROD_DB_HOST') &&
      this.configService.get('NODE_ENV') === 'production'
    ) {
      return {
        type: 'postgres',
        host: this.configService.get('PROD_DB_HOST'),
        port: this.configService.get('PROD_DB_PORT'),
        username: this.configService.get('PROD_DB_USER'),
        password: this.configService.get('PROD_DB_PASSWORD'),
        database: this.configService.get('PROD_DB_NAME'),
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        synchronize: true,
        ssl: {
          rejectUnauthorized: false,
        },
      };
    }
  }
}

const databaseService = new DatabaseService(new ConfigService());

export { databaseService };
