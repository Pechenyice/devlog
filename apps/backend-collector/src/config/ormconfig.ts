import { DataSource } from 'typeorm';

export const connectionSource = new DataSource({
  type: 'postgres',
  host: process.env.DATABASE_HOST || 'localhost',
  port: parseInt(process.env.DATABASE_PORT, 10) || 5433,
  username: process.env.DATABASE_USER || 'postgres',
  password: process.env.DATABASE_PASSWORD || 'postgres',
  database: process.env.DATABASE_NAME || 'devlog',
  migrations: ['src/migrations/*.{ts,js}'],
  entities: ['src/models/**/*.{ts,js}'],
  migrationsTableName: 'migrations_typeorm',
  migrationsRun: true,
  synchronize: false,
  logging: true,
});
