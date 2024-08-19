const express = require('express');
const topService = require('../services/topFivePostService');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Boards
 *   description: 게시판 관련 API
 */

/**
 * @swagger
 * /board/top5:
 *   get:
 *     summary: 모든 게시판에서 상위 5개의 게시글을 가져옵니다.
 *     tags: [Boards]
 *     responses:
 *       200:
 *         description: 상위 5개의 게시글 리스트
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: 게시글 ID
 *                   title:
 *                     type: string
 *                     description: 게시글 제목
 *                   content:
 *                     type: string
 *                     description: 게시글 내용
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     description: 게시글 작성 날짜
 *                   user_id:
 *                     type: integer
 *                     description: 작성자 ID
 *       500:
 *         description: 서버 에러
 */
router.get('/top5', async (req, res) => {
    try {
        const topPosts = await topService.getTop5PostsFromAll();
        res.status(200).json(topPosts);
    } catch (error) {
        console.error('Error fetching top 5 posts from all boards:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

module.exports = router;