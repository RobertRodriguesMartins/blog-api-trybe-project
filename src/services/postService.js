const models = require('../database/models');

const postService = {
  /**
   * @param {{title: string, content: string, userId: number}} post
   */
  create: async (post) => {
    const { dataValues: created } = await models.BlogPost.create(post);
    return created;
  },
  findAll: async () => {
    const post = await models.BlogPost.findAll({
      attributes: { exclude: ['password'] },
      include: [
        { association: 'user', attributes: { exclude: ['password'] } },
        {
          association: 'categories',
          through: { attributes: [] },
        },
      ],
    });

    return post;
  },
};

module.exports = postService;
