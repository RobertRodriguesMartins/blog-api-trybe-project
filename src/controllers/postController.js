const {
  postService,
  categoryService,
  postCategoryService,
} = require('../services');
const CustomError = require('../utils/customError');
const runSchema = require('../utils/runSchema');
/**
 * @typedef {import('express').RequestHandler} handler
 */
/**
 * @type {{
 * create: handler,
 * edit: handler,
 * findAll: handler,
 * findOne: handler,
 * findByOffset: handler,
 * findMaxOffset: handler,
 * findOneByQuery: handler,
 * remove: handler,
 * }}
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
  edit: async (req, res) => {
    const { id } = await runSchema('findPost', {
      ...req.params,
    });
    const postBody = await runSchema('editPost', {
      ...req.body,
    });
    const post = await postService.findOne(id);
    if (post.userId !== req.userId.id) {
      throw new CustomError('NotAllowedError', 'Unauthorized user');
    }

    await postService.edit(id, postBody);
    const newPost = await postService.findOne(id);
    return res.status(200).json(newPost);
  },
  findAll: async (req, res) => {
    const posts = await postService.findAll();

    return res.status(200).json(posts);
  },
  findOne: async (req, res) => {
    const { id } = await runSchema('findPost', {
      ...req.params,
    });
    const post = await postService.findOne(id);

    return res.status(200).json(post);
  },
  findByOffset: async (req, res) => {
    const { q } = await runSchema('findPostByOffset', { ...req.query });
    const posts = await postService.findByOffset(q);
    return res.status(200).json(posts);
  },
  findMaxOffset: async (req, res) => {
    const offset = await postService.findMaxOffset();
    return res.status(200).json(offset);
  },
  findOneByQuery: async (req, res) => {
    const { q } = await runSchema('findPostByQuery', {
      ...req.query,
    });
    let post = '';
    if (q === '') {
      post = await postService.findAll();
    } else {
      post = await postService.findOneByQuery(q);
    }
    if (!post) post = [];
    return res.status(200).json(post);
  },
  remove: async (req, res) => {
    const { id } = await runSchema('findPost', {
      ...req.params,
    });
    const post = await postService.findOne(id);
    if (post.userId !== req.userId.id) {
      throw new CustomError('NotAllowedError', 'Unauthorized user');
    }
    await postService.remove(id);
    return res.status(204).end();
  },
};

module.exports = postController;
