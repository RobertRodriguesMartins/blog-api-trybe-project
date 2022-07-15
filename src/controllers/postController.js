const {
  postService,
  categoryService,
  postCategoryService,
} = require('../services');
const runSchema = require('../utils/runSchema');
/**
 * @typedef {import('express').RequestHandler} handler
 */
/**
 * @type {{create: handler}}
 */
const postController = {
  create: async (req, res) => {
    const { categoryIds, ...post } = await runSchema('createPost', {
      ...req.body,
    });
    post.userId = req.userId.id;
    await categoryService.findMany(categoryIds);
    const { id, ...postData } = await postService.create(post);
    await postCategoryService.createPostCategory(id, categoryIds);

    postData.userId = post.userId;
    postData.id = id;
    return res.status(201).json(postData);
  },

  findAll: async (req, res) => {
    const posts = await postService.findAll();

    return res.status(200).json(posts);
  },
};

module.exports = postController;
