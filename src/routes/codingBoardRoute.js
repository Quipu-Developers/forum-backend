const express = require('express');
const codingBoardController = require('../controllers/codingBoardController');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: CodingBoard
 *   description: Coding Board API
 */

/**
 * @swagger
 * /board/coding/posts:
 *   post:
 *     summary: Create a new post
 *     tags: [CodingBoard]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - user_name
 *               - title
 *               - content
 *             properties:
 *               user_name:
 *                 type: string
 *                 description: Name of the user
 *               title:
 *                 type: string
 *                 description: Title of the post
 *               content:
 *                 type: object
 *                 description: Content of the post
 *           examples:
 *             example1:
 *               summary: An example of a request body
 *               value:
 *                 user_name: "test_user"
 *                 title: "Test Title"
 *                 content: {"body": "Test Content"}
 *     responses:
 *       201:
 *         description: The post was successfully created
 *       500:
 *         description: Some server error
 */
router.post('/coding/posts', codingBoardController.createPost);

/**
 * @swagger
 * /board/coding/posts:
 *   get:
 *     summary: Returns the list of all the posts
 *     tags: [CodingBoard]
 *     responses:
 *       200:
 *         description: The list of the posts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *       500:
 *         description: Some server error
 */
router.get('/coding/posts', codingBoardController.getAllPosts);

/**
 * @swagger
 * /board/coding/posts/{id}:
 *   get:
 *     summary: Get a post by ID
 *     tags: [CodingBoard]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The post ID
 *     responses:
 *       200:
 *         description: The post description by ID
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       404:
 *         description: The post was not found
 *       500:
 *         description: Some server error
 */
router.get('/coding/posts/:id', codingBoardController.getPostById);

/**
 * @swagger
 * /board/coding/posts/{id}:
 *   put:
 *     summary: Update a post by ID
 *     tags: [CodingBoard]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The post ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_name:
 *                 type: string
 *               title:
 *                 type: string
 *               content:
 *                 type: object
 *           examples:
 *             example1:
 *               summary: An example of a request body
 *               value:
 *                 user_name: "updated_user"
 *                 title: "Updated Title"
 *                 content: {"body": "Updated Content"}
 *     responses:
 *       200:
 *         description: The post was updated successfully
 *       404:
 *         description: The post was not found
 *       500:
 *         description: Some server error
 */
router.put('/coding/posts/:id', codingBoardController.updatePost);

/**
 * @swagger
 * /board/coding/posts/{id}:
 *   delete:
 *     summary: Delete a post by ID
 *     tags: [CodingBoard]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The post ID
 *     responses:
 *       200:
 *         description: The post was deleted successfully
 *       404:
 *         description: The post was not found
 *       500:
 *         description: Some server error
 */
router.delete('/coding/posts/:id', codingBoardController.deletePost);

module.exports = router;
