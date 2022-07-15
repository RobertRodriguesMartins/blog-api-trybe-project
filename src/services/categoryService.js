const models = require('../database/models');
const CustomError = require('../utils/customError');

const userService = {
  /**
   * @param {number[]} categories
   * @param {{name: string}} categoryObject
   */
  findByName: async (categoryObject) => {
    const category = await models.Category.findOne({
      where: {
        name: categoryObject.name,
      },
    });

    return category;
  },
  findAll: async () => {
    const categories = await models.Category.findAll({
      raw: true,
    });

    return categories;
  },
  findById: async (id) => {
    const category = await models.Category.findOne({
      where: {
        id,
      },
    });

    return category;
  },
  create: async (categoryObject) => {
    const { dataValues: category } = await models.Category.create(
      categoryObject,
    );
    return category;
  },
  /**
   * @param {number[]} categories
   */
  findMany: async (categories) => {
    const promises = [];
    categories.forEach((categoryId) => {
      promises.push(
        models.Category.findOne({
          where: {
            id: categoryId,
          },
          rejectOnEmpty: true,
        }),
      );
    });

    try {
      await Promise.all(promises);
    } catch (e) {
      throw new CustomError('ValidationError', '"categoryIds" not found');
    }
  },
};

module.exports = userService;
