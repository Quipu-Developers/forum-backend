// /src/routes/postRoutes.js
const express = require('express');
const postController = require('../controllers/postController');

const router = express.Router();

router.post('/posts', postController.createPost);
router.get('/posts/:id', postController.getPostById);
router.put('/posts/:id', postController.updatePost);
router.delete('/posts/:id', postController.deletePost);
router.get('/posts', postController.getAllPosts);

module.exports = router;