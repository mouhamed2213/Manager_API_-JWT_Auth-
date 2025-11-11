// setup schema
import { relations } from 'drizzle-orm';
import { serial, mysqlEnum } from 'drizzle-orm/mysql-core';
import { ArticleTable } from './articles.schema';
import { varchar, int, mysqlTable } from 'drizzle-orm/mysql-core';

// create user table
export const UserTable = mysqlTable('users', {
  id: serial('id').primaryKey(),
  email: varchar('email', { length: 255 }).unique().notNull(),
  password: varchar('password', { length: 255 }).notNull(),
  role: mysqlEnum('role', ['admin', 'client']).default('client'),
});

// Relation  a user can have many article 1 <-> N
export const UserRelation = relations(UserTable, ({ many }) => ({
  articles: many(ArticleTable), //
}));
