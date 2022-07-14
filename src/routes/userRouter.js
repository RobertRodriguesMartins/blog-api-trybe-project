const Router = require('express').Router();
const { userController } = require('../controllers');
const { tokenMiddleware } = require('../middlewares');

Router.post('/', userController.create)
  .use(tokenMiddleware)
  .get('/:id', userController.findById)
  .get('/', userController.findAll);

module.exports = Router;
