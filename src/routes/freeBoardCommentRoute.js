const express = require('express');
const boardCommentController = require('../controllers/boardCommentController');
const freeBoardComment = require('../models/forumModels/free_board_comment');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: FreeBoardComment
 *   description: Free Board Comment API
 */

/**
 * @swagger
 * /board/free/comments:
 *   post:
 *     summary: Create a new comment
 *     tags: [FreeBoardComment]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - user_name
 *               - comment
 *               - post_id
 *               - user_id
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
 *               post_id:
 *                 type: integer
 *                 description: ID of the post the comment is associated with
 *               user_id:
 *                 type: integer
 *                 description: ID of the user making the comment
 *           examples:
 *             example1:
 *               summary: An example of a request body
 *               value:
 *                 parent_comment_id: 1
 *                 user_name: "test_user"
 *                 comment: "Test Comment"
 *                 post_id: 1
 *                 user_id: 1
 *     responses:
 *       201:
 *         description: The comment was successfully created
 *       500:
 *         description: Some server error
 */
router.post('/free/comments', (req, res) => boardCommentController.createComment(freeBoardComment, req, res));

/**
 * @swagger
 * /board/free/comments:
 *   get:
 *     summary: Returns the list of all the comments
 *     tags: [FreeBoardComment]
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
router.get('/free/comments', (req, res) => boardCommentController.getAllComments(freeBoardComment, req, res));

/**
 * @swagger
 * /board/free/comments/{id}:
 *   get:
 *     summary: Get a comment by ID
 *     tags: [FreeBoardComment]
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
router.get('/free/comments/:id', (req, res) => boardCommentController.getCommentById(freeBoardComment, req, res));

/**
 * @swagger
 * /board/free/comments/{id}:
 *   put:
 *     summary: Update a comment by ID
 *     tags: [FreeBoardComment]
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
router.put('/free/comments/:id', (req, res) => boardCommentController.updateComment(freeBoardComment, req, res));

/**
 * @swagger
 * /board/free/comments/{id}:
 *   delete:
 *     summary: Delete a comment by ID
 *     tags: [FreeBoardComment]
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
router.delete('/free/comments/:id', (req, res) => boardCommentController.deleteComment(freeBoardComment, req, res));
/**
 * @swagger
 * /board/free/comments/nested/{parentCommentId}:
 *   get:
 *     summary: Get nested comments by parent comment ID
 *     tags: [FreeBoardComment]
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
router.get('/free/comments/nested/:parentCommentId',  (req, res) => boardCommentController.getNestedCommentById(freeBoardComment, req, res));
module.exports = router;
