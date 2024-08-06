const express = require('express');
const infoBoardController = require('../controllers/infoBoardController');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: InfoBoard
 *   description: Information Board API
 */

/**
 * @swagger
 * /board/info/posts:
 *   post:
 *     summary: Create a new post
 *     tags: [InfoBoard]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - user_id
 *               - user_name
 *               - title
 *               - content
 *             properties:
 *               user_id:
 *                 type: integer
 *                 description: ID of the user
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
 *                 user_id: 1
 *                 user_name: "test_user"
 *                 title: "Test Title"
 *                 content: {"body": "Test Content"}
 *     responses:
 *       201:
 *         description: The post was successfully created
 *       500:
 *         description: Some server error
 */
router.post('/info/posts', infoBoardController.createPost);

/**
 * @swagger
 * /board/info/posts:
 *   get:
 *     summary: Returns the list of all the posts
 *     tags: [InfoBoard]
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
router.get('/info/posts', infoBoardController.getAllPosts);

/**
 * @swagger
 * /board/info/posts/{id}:
 *   get:
 *     summary: Get a post by ID
 *     tags: [InfoBoard]
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
router.get('/info/posts/:id', infoBoardController.getPostById);

/**
 * @swagger
 * /board/info/posts/{id}:
 *   put:
 *     summary: Update a post by ID
 *     tags: [InfoBoard]
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
router.put('/info/posts/:id', infoBoardController.updatePost);

/**
 * @swagger
 * /board/info/posts/{id}:
 *   delete:
 *     summary: Delete a post by ID
 *     tags: [InfoBoard]
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
router.delete('/info/posts/:id', infoBoardController.deletePost);

module.exports = router;
