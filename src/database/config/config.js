require('dotenv').config();

const options = {
  host:
    process.env.MYSQL_PROD_HOSTNAME || process.env.MYSQL_HOST || 'localhost',
  port: process.env.MYSQL_PROD_PORT || '3306',
  database: process.env.MYSQL_PROD_DB_NAME || 'blogs-api',
  username: process.env.MYSQL_PROD_USER || 'root',
  password: process.env.MYSQL_PROD_PASSWORD || 'root',
  dialect: 'mysql',
  dialectOptions: {
    timezone: 'Z',
  },
  logging: process.env.DEBUG !== 'false',
};

module.exports = {
  development: {
    ...options,
  },
  test: {
    ...options,
  },
};
