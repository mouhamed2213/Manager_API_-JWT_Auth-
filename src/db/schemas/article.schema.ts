import {
  mysqlTable,
  serial,
  varchar,
  text,
  timestamp,
  int,
} from 'drizzle-orm/mysql-core';
import { UserTable as users } from '../schemas/user.schema';
import { relations } from 'drizzle-orm';

// create table name
export const ArticleTable = mysqlTable('articles', {
  id: serial('id').primaryKey().notNull(),
  author_id: int('author_id').references(() => users.id),
  title: varchar('title', { length: 255 }).notNull(),
  content: text('content').notNull(),
  createdAt: timestamp('createdAt').defaultNow().notNull(),
});

// Relation with the user
// an article is bounded with a user

export const ArticleRelation = relations(ArticleTable, ({ one }) => ({
  users: one(users, {
    fields: [ArticleTable.author_id],
    references: [users.id],
  }),
}));

// type  article type
export const ArticleInsert = typeof ArticleTable.$inferInsert;
export const ArticleSelect = typeof ArticleTable.$inferSelect;
