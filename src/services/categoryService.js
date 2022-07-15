const models = require('../database/models');

const userService = {
  /**
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
};

module.exports = userService;
