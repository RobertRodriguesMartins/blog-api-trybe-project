const models = require('../database/models');

const userService = {
  /**
   * @param {{email: string, password: string, displayName: string, image: string}} requestUser
   */
  findOneByEmail: async (requestUser) => {
    const user = await models.User.findOne({
      where: {
        email: requestUser.email,
      },
    });

    return user;
  },
  findAll: async () => {
    const user = await models.User.findAll({
      raw: true,
      attributes: { exclude: ['password'] },
    });

    return user;
  },
  findById: async (id) => {
    const user = await models.User.findOne({
      where: {
        id,
      },
      attributes: {
        exclude: ['password'],
      },
    });

    return user;
  },
  create: async (requestUser) => {
    const { dataValues: user } = await models.User.create(requestUser);
    return user;
  },
};

module.exports = userService;
