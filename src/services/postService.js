const { Op } = require('sequelize');
const models = require('../database/models');
const CustomError = require('../utils/customError');

const myAssociations = {
  include: [
    { association: 'user', attributes: { exclude: ['password'] } },
    {
      association: 'categories',
      through: { attributes: [] },
    },
  ],
};

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
      ...myAssociations,
    });
    if (!post) throw new CustomError('NotFoundError', 'Post does not exist');
    return post;
  },
  findOneByQuery: async (name) => {
    const post = await models.BlogPost.findAll({
      where: {
        [Op.or]: [
          {
            content: {
              [Op.like]: `%${name}%`,
            },
          },
          {
            title: {
              [Op.like]: `%${name}%`,
            },
          },
        ],
      },
      ...myAssociations,
    });
    return post;
  },
  findAll: async () => {
    const post = await models.BlogPost.findAll({
      attributes: { exclude: ['password'] },
      ...myAssociations,
    });

    return post;
  },
  remove: async (id) => {
    await models.BlogPost.destroy({
      where: {
        id,
      },
    });
  },
};

module.exports = postService;
