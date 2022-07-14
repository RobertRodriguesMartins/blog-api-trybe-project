const Router = require('express').Router();
const loginController = require('../controllers');

Router.get('/', loginController.login);

module.exports = Router;
