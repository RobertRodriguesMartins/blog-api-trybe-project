const models = require('../database/models');

const loginService = {
  /**
   * @param {{email: string, password: string}} requestUser
   */
  login: async (requestUser) => {
    const user = await models.User.findOne({
      where: {
        email: requestUser.email,
        password: requestUser.password,
      },
    });

    return user;
  },
};

module.exports = loginService;
