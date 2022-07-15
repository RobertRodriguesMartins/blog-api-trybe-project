const models = require('../database/models');
const CustomError = require('../utils/customError');

const postService = {
  /**
   * @param {{title: string, content: string, userId: number}} post
   */
  create: async (post) => {
    const { dataValues: created } = await models.BlogPost.create(post);
    return created;
  },
  edit: async (id, post) => {
    await models.BlogPost.update(post, {
      where: {
        id,
      },
      fields: ['title', 'content'],
    });
  },
  findOne: async (id) => {
    const post = await models.BlogPost.findOne({
      where: {
        id,
      },
      include: [
        { association: 'user', attributes: { exclude: ['password'] } },
        {
          association: 'categories',
          through: { attributes: [] },
        },
      ],
    });
    if (!post) throw new CustomError('NotFoundError', 'Post does not exist');
    return post;
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
