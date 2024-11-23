export const dbConfig = {
  host: process.env.DB_HOST ?? 'db',
  user: process.env.DB_USER ?? 'root',
  password: process.env.DB_PASSWORD ?? 'root_password',
  database: process.env.DB_NAME ?? 'travels_db',
};