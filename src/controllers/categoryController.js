const { categoryService } = require('../services');
const CustomError = require('../utils/customError');
const runSchema = require('../utils/runSchema');
/**
 * @typedef {import('express').RequestHandler} handler
 */
/**
 * @type {{create: handler}}
 */
const categoryController = {
  create: async (req, res) => {
    const category = await runSchema('createCategory', { ...req.body });
    const exists = await categoryService.findByName(category);
    if (exists)
      throw new CustomError(
        'CategoryExistsError',
        'category already registered'
      );

    const created = await categoryService.create(category);
    return res.status(201).json(created);
  },
};

module.exports = categoryController;
