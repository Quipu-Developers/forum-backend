const express = require('express');
const codingBoardCommentController = require('../controllers/codingBoardCommentController');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: CodingBoardComment
 *   description: Coding Board Comment API
 */

/**
 * @swagger
 * /board/coding/comments:
 *   post:
 *     summary: Create a new comment
 *     tags: [CodingBoardComment]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - user_name
 *               - comment
 *             properties:
 *               parent_comment_id:
 *                 type: integer
 *                 description: ID of the parent comment
 *               user_name:
 *                 type: string
 *                 description: Name of the user
 *               comment:
 *                 type: string
 *                 description: Content of the comment
 *           examples:
 *             example1:
 *               summary: An example of a request body
 *               value:
 *                 parent_comment_id: 1
 *                 user_name: "test_user"
 *                 comment: "Test Comment"
 *     responses:
 *       201:
 *         description: The comment was successfully created
 *       500:
 *         description: Some server error
 */
router.post('/coding/comments', codingBoardCommentController.createComment);

/**
 * @swagger
 * /board/coding/comments:
 *   get:
 *     summary: Returns the list of all the comments
 *     tags: [CodingBoardComment]
 *     responses:
 *       200:
 *         description: The list of the comments
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *       500:
 *         description: Some server error
 */
router.get('/coding/comments', codingBoardCommentController.getAllComments);

/**
 * @swagger
 * /board/coding/comments/{id}:
 *   get:
 *     summary: Get a comment by ID
 *     tags: [CodingBoardComment]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The comment ID
 *     responses:
 *       200:
 *         description: The comment description by ID
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       404:
 *         description: The comment was not found
 *       500:
 *         description: Some server error
 */
router.get('/coding/comments/:id', codingBoardCommentController.getCommentById);

/**
 * @swagger
 * /board/coding/comments/{id}:
 *   put:
 *     summary: Update a comment by ID
 *     tags: [CodingBoardComment]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The comment ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               parent_comment_id:
 *                 type: integer
 *               user_name:
 *                 type: string
 *               comment:
 *                 type: string
 *           examples:
 *             example1:
 *               summary: An example of a request body
 *               value:
 *                 parent_comment_id: 1
 *                 user_name: "updated_user"
 *                 comment: "Updated Comment"
 *     responses:
 *       200:
 *         description: The comment was updated successfully
 *       404:
 *         description: The comment was not found
 *       500:
 *         description: Some server error
 */
router.put('/coding/comments/:id', codingBoardCommentController.updateComment);

/**
 * @swagger
 * /board/coding/comments/{id}:
 *   delete:
 *     summary: Delete a comment by ID
 *     tags: [CodingBoardComment]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The comment ID
 *     responses:
 *       200:
 *         description: The comment was deleted successfully
 *       404:
 *         description: The comment was not found
 *       500:
 *         description: Some server error
 */
router.delete('/coding/comments/:id', codingBoardCommentController.deleteComment);

/**
 * @swagger
 * /board/coding/comments/nested/{parentCommentId}:
 *   get:
 *     summary: Get nested comments by parent comment ID
 *     tags: [CodingBoardComment]
 *     parameters:
 *       - in: path
 *         name: parentCommentId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The parent comment ID
 *     responses:
 *       200:
 *         description: The list of nested comments
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *       500:
 *         description: Some server error
 */
router.get('/coding/comments/nested/:parentCommentId', codingBoardCommentController.getNestedCommentById);

module.exports = router;
