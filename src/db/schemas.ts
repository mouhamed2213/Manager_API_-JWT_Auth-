// setup schema
import { mysqlEnum } from 'drizzle-orm/mysql-core';
import { varchar, int, mysqlTable } from 'drizzle-orm/mysql-core';

// create user table
export const UserTable = mysqlTable('users', {
  id: int('id').primaryKey().autoincrement(),
  email: varchar('email', { length: 255 }).unique().notNull(),
  password: varchar('password', { length: 255 }).notNull(),
  role: mysqlEnum('role', ['admin', 'client']).default('client'),
});
