const loginSchemas = require('./loginSchemas');
const userSchemas = require('./userSchemas');
const tokenSchemas = require('./tokenSchemas');
const categorySchemas = require('./categorySchemas');

module.exports = {
  ...loginSchemas,
  ...userSchemas,
  ...tokenSchemas,
  ...categorySchemas,
};
