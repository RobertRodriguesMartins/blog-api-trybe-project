const loginSchemas = require('./loginSchemas');
const userSchemas = require('./userSchemas');
const tokenSchemas = require('./tokenSchemas');

module.exports = {
  ...loginSchemas,
  ...userSchemas,
  ...tokenSchemas,
};
