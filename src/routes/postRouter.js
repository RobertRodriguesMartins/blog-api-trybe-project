const Router = require('express').Router();
const { postController } = require('../controllers');
const { tokenMiddleware } = require('../middlewares');

Router.use(tokenMiddleware)
  .post('/', postController.create)
  .get('/', postController.findAll);

module.exports = Router;
