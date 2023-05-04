import { DataSource } from 'typeorm';
import configs from './environments.config';

const AppDataSource = new DataSource({
  type: 'postgres',
  host: configs.dbHost,
  port: Number(configs.dbPort),
  username: configs.dbUserName,
  password: configs.dbPassword,
  database: configs.database,
  synchronize: false,
  logging: true,
  migrationsRun: true,
  entities: ['./src/modules/**/models/entities/*.ts'],
  migrations: ['./src/shared/migrations/*.ts'],
  applicationName: configs.databaseAppName,
});

(async () => {
  try {
    await AppDataSource.initialize();
    console.log('Connected to database');
  } catch (err: any) {
    console.error(
      'Something went wrong when connecting to the database:\n',
      err.stack
    );
  }
})();

export default AppDataSource;
