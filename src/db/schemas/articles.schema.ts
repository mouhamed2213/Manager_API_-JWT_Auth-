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
import { z } from 'zod';
import tr from 'zod/v4/locales/tr.js';

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

// schema
export const createArticleSchema = z
  .object({
    id: z.int(),
    author_id: z.number(),
    title: z.string().min(3, { message: 'The Title is short ' }),
    content: z.string().min(20, { message: 'The content is very short ' }),
  })
  .omit({ id: true, author_id: true });

// type  article type
export type CreateArticleDto = z.infer<typeof createArticleSchema>;

export type Article = typeof ArticleTable.$inferSelect;
