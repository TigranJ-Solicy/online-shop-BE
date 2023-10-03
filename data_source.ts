import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'myuser',
  password: 'myuser',
  database: 'dnname',
  synchronize: true,
  logging: false,
  migrations: ['src/migrations/*.ts'],
  entities: ['src/entities/*.ts'],
});
