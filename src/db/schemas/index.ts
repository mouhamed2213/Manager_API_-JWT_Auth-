import * as articleSchema from './articles.schema';
import * as usersSchema from './users.schema';

const schemas = {
  ...articleSchema,
  ...usersSchema,
};

export default schemas;
