/*
    This folder file is a  for to our nest application used to load env Variable
    Centrized them 
    allow reusability easier and type , set default value to them
*/
export default () => ({
  // information about app
  app: {
    host: process.env.APP_HOST,
    port: process.env.APP_PORT,
  },

  database: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 3306,
    name: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    url: process.env.DB_URL || null,
  },
});
