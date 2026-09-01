import { DataSource, DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';
import { join } from 'path';

dotenv.config({ path: '.env' });

export const buildDataSourceOptions = (configSource: {
  getDatabaseHost: () => string | undefined;
  getDatabasePort: () => number | undefined;
  getDatabaseUsername: () => string | undefined;
  getDatabasePassword: () => string | undefined;
  getDatabaseName: () => string | undefined;
}): DataSourceOptions => ({
  type: 'postgres',
  host: configSource.getDatabaseHost(),
  port: configSource.getDatabasePort(),
  username: configSource.getDatabaseUsername(),
  password: configSource.getDatabasePassword(),
  database: configSource.getDatabaseName(),
  synchronize: false,
  logging: true,
  entities: [join(__dirname, '..', '**', '*.entity.{js,ts}')],
  migrations: [join(__dirname, 'migrations', '*.{js,ts}')],
});

const cliDataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432', 10) || 5432,
  username: process.env.DB_USERNAME || 'mmdb',
  password: process.env.DB_PASSWORD || 'mmdb',
  database: process.env.DB_NAME || 'mmdb',
  synchronize: false,
  logging: true,
  entities: [join(__dirname, '..', '**', '*.entity.{js,ts}')],
  migrations: [join(__dirname, 'migrations', '*.{js,ts}')],
};

const dataSource = new DataSource(cliDataSourceOptions);
export default dataSource;
