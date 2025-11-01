/*
    This folder file is a  for to our nest application used to load env Variable
    Centrized them 
    allow reusability easier and type , set default value to them
*/
export default () => ({
  app: {
    port: parseInt(process.env.APP_PORT || '3000', 10),
  },

  database: {
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '3306', 10),
    name: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    url: process.env.DB_URL!,
  },
});
