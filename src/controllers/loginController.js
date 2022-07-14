const loginService = require('../services');
const runSchema = require('../utils/runSchema');
/**
 * @typedef {import('express').RequestHandler} handler
 */
/**
 * @type {{login: handler}}
 */
const loginController = {
  login: async (req, res) => {
    const user = await runSchema('login', { ...req.body });
    const data = await loginService.login(user);

    return res.status(200).json(data);
  },
};

module.exports = loginController;
