import { DataSource } from 'typeorm';
import User from '../../modules/users/typeorm/entities/user.entity';
import { UserMigration1674754058814 } from './migrations/1674754058814-UserMigration';

export const connectionSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'cruduser',
  database: 'mysql',
  migrations: [UserMigration1674754058814],
  entities: [User],
});
