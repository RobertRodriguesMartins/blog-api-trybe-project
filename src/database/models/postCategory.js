const { postsCategoriesAttributes } = require('./attributes');

/**
 * @param {import('sequelize').Sequelize} sequelize
 */
const postsCategories = (sequelize) => {
  const postsCategories = sequelize.define(
    'PostCategory',
    postsCategoriesAttributes,
    {
      tableName: 'PostCategories',
      timestamps: false,
    }
  );

  return postsCategories;
};

module.exports = postsCategories;
