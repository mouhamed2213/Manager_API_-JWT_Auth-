import { title } from 'process';
import { z } from 'zod';

export const articleSchema = z.object({
  id: z.int().optional(),
  author_id: z.bigint().optional(),
  title: z.string().nonempty().nonoptional(),
  content: z.string().nonempty().nonoptional(),
});

// define the type
export type ArticleDto = z.infer<typeof articleSchema>;
