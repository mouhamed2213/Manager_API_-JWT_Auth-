import {
  mysqlTable,
  serial,
  varchar,
  text,
  timestamp,
  bigint,
} from 'drizzle-orm/mysql-core';
import { UserTable as users } from './users.schema';
import { relations } from 'drizzle-orm';
import {} from 'drizzle-orm/gel-core';

// create table name
export const ArticleTable = mysqlTable('articles', {
  id: serial('id').primaryKey(),
  author_id: bigint('author_id', { mode: 'number', unsigned: true })
    .references(() => users.id, { onDelete: 'cascade' })
    .unique(),
  title: varchar('title', { length: 255 }).notNull(),
  content: text('content').notNull(),
  createdAt: timestamp('createdAt').defaultNow().notNull(),
});

// Relation with the user
// an article is bounded with a user

export const ArticleRelation = relations(ArticleTable, ({ one }) => ({
  author: one(users, {
    fields: [ArticleTable.author_id],
    references: [users.id],
  }),
}));

// type  article type
export const ArticleInsert = typeof ArticleTable.$inferInsert;
export const ArticleSelect = typeof ArticleTable.$inferSelect;
