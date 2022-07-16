const Router = require('express').Router();
const { postController } = require('../controllers');
const { tokenMiddleware } = require('../middlewares');

Router.use(tokenMiddleware)
  .post('/', postController.create)
  .put('/:id', postController.edit)
  .get('/:id', postController.findOne)
  .delete('/:id', postController.remove)
  .get('/', postController.findAll);

module.exports = Router;
