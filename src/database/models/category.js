const { categoriesAttributes } = require('./attributes');

/**
 * @param {import('sequelize').Sequelize} sequelize
 */
const categoriesGenerator = (sequelize) => {
  const categories = sequelize.define('Category', categoriesAttributes, {
    tableName: 'Categories',
    timestamps: false,
  });

  categories.associate = (models) => {
    categories.hasMany(models.PostCategory, {
      foreignKey: 'categoryId',
      as: 'posts',
    });
  };

  return categories;
};

module.exports = categoriesGenerator;
