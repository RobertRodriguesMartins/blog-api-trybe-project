const { blogPostsAttributes } = require('./attributes');

/**
 * @param {import('sequelize').Sequelize} sequelize
 */
const blogPostsGenerator = (sequelize) => {
  const blogPosts = sequelize.define('BlogPost', blogPostsAttributes, {
    timestamps: false,
    tableName: 'BlogPosts',
  });

  blogPosts.associate = (models) => {
    blogPosts.belongsTo(models.User, { foreignKey: 'userId', as: 'users' });

    blogPosts.hasMany(models.PostCategory, {
      foreignKey: 'postId',
      as: 'categories',
    });
  };

  return blogPosts;
};

module.exports = blogPostsGenerator;
