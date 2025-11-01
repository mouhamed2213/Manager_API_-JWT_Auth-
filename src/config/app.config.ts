/*
    This folder file is a  for to our nest application used to load env Variable
    Centrized them 
    allow reusability easier and type , set default value to them
*/
export default () => ({
  // information about app
  app: {
    name: process.env.APP_NAME,
    host: process.env.APP_HOST,
    port: process.env.APP_PORT,
    env: process.env.APP_ENV,
  },

  database: {
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 3306,
    name: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
  },
});
