import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  out: './drizzle/migration',
  dialect: 'mysql',
  schema: './src/db/schemas', // get the index directe
  dbCredentials: {
    url: process.env.DB_URL!,
  },
  verbose: true,
  strict: true,
});
