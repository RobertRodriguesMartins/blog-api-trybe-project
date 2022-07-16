const Router = require('express').Router();
const { postController } = require('../controllers');
const { tokenMiddleware } = require('../middlewares');

Router.use(tokenMiddleware)
  .post('/', postController.create)
  .get('/search', postController.findOneByQuery)
  .get('/:id', postController.findOne)
  .get('/', postController.findAll)
  .put('/:id', postController.edit)
  .delete('/:id', postController.remove);

module.exports = Router;
